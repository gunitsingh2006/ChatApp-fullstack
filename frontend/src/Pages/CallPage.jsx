import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useAuthUser from "../hooks/useAuthUser";
import { getStreamToken } from "../lib/api";
import PageLoader from "../components/PageLoader.jsx";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading: authLoading } = useAuthUser();

  const {
    data: tokenData,
    isLoading: tokenLoading,
    isError: tokenError,
  } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    if (!authUser || !callId || !tokenData?.token) {
      return;
    }

    let videoClient;
    let callInstance;
    let cancelled = false;

    const initCall = async () => {
      try {
        setIsConnecting(true);

        if (!STREAM_API_KEY) {
          throw new Error("Stream API key is missing");
        }

        console.log("Initializing Stream video client...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.pfp,
        };

        videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        callInstance = videoClient.call("default", callId);

        await callInstance.join({
          create: true,
        });

        if (cancelled) {
          await callInstance.leave();
          await videoClient.disconnectUser();
          return;
        }

        console.log("Joined call successfully");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);

        if (!cancelled) {
          toast.error("Could not join the call. Please try again.");
          setClient(null);
          setCall(null);
        }
      } finally {
        if (!cancelled) {
          setIsConnecting(false);
        }
      }
    };

    initCall();

    // Cleanup when leaving the page
    return () => {
      cancelled = true;

      const cleanup = async () => {
        try {
          if (callInstance) {
            await callInstance.leave();
          }

          if (videoClient) {
            await videoClient.disconnectUser();
          }

          console.log("Left call and disconnected video client");
        } catch (error) {
          console.error("Error cleaning up call:", error);
        }
      };

      cleanup();
    };
  }, [authUser, callId, tokenData]);

  if (authLoading || tokenLoading || isConnecting) {
    return <PageLoader />;
  }

  if (tokenError) {
    return (
      <div className="flex h-screen items-center justify-center bg-base-200">
        <div className="rounded-xl bg-base-100 p-6 text-center shadow-lg">
          <h2 className="text-xl font-semibold">
            Unable to connect to video call
          </h2>

          <p className="mt-2 text-sm opacity-70">
            Could not get the Stream video token.
          </p>
        </div>
      </div>
    );
  }

  if (!client || !call) {
    return (
      <div className="flex h-screen items-center justify-center bg-base-200">
        <div className="rounded-xl bg-base-100 p-6 text-center shadow-lg">
          <h2 className="text-xl font-semibold">
            Could not initialize call
          </h2>

          <p className="mt-2 text-sm opacity-70">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <CallContent />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      <div className="relative flex h-screen w-full flex-col">
        <div className="min-h-0 flex-1">
          <SpeakerLayout />
        </div>

        <div className="shrink-0">
          <CallControls />
        </div>
      </div>
    </StreamTheme>
  );
};

export default CallPage;