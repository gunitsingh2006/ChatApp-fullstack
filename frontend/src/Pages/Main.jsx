import { useState, useEffect } from "react";
import {
  Lock,
  Users,
  Video,
  Globe,
  Download,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  MessageCircle,
  Zap,
  Check,
  Wifi,
  Palette,
} from "lucide-react";

export default function App() {
  const messages = [
    { from: "them", text: "Are we still on for coffee tomorrow?" },
    { from: "me", text: "Wouldn't miss it ☕" },
    { from: "them", text: "9am, the usual place?" },
    { from: "me", text: "Perfect, see you then" },
  ];

  const [shown, setShown] = useState( 0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shown < messages.length) {
      const timer = setTimeout(() => {
        setShown((v) => v + 1);
      }, 800);

      return () => clearTimeout(timer);
    }

    // Restart animation after a few seconds
    const restart = setTimeout(() => {
      setShown(0);
    }, 5000);

    return () => clearTimeout(restart);
  }, [shown]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Security", href: "#security" },
    { label: "Download", href: "#download" },
  ];

  const smallFeatures = [
    {
      icon: Users,
      title: "Group chats that stay readable",
      body: "Threads, replies and pinned messages keep busy groups from turning into noise.",
    },
    {
      icon: Video,
      title: "Calls that just connect",
      body: "One tap starts a clear voice or video call, no dropped connections or waiting rooms.",
    },
    {
      icon: Globe,
      title: "Works everywhere you do",
      body: "Start a chat on your phone, finish it on your laptop. Everything stays in sync.",
    },
    {
      icon: Palette,
      title: "Customizable themes",
      body: "Personalize your experience with a variety of 30+ themes and color schemes.",
    },
  ];

  const footerColumns = [
    {
      heading: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Download", href: "#download" },
        { label: "What's new", href: "#features" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Careers", href: "#careers" },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: "Help center", href: "#support" },
        { label: "Contact us", href: "#support" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink font-sans scroll-smooth overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #1F1F1F;
        }

        .bg-paper {
          background-color: #1F1F1F;
        }

        .bg-ink {
          background-color: #20262A;
        }

        .bg-teal {
          background-color: #23639A;
        }

        .bg-ember {
          background-color: #2196F3;
        }

        .bg-white-card {
          background-color: #202020;
        }

        .text-ink {
          color: #E2E2E2;
        }

        .text-ink-soft {
          color: #A3A3A3;
        }

        .text-paper {
          color: #F1F1F1;
        }

        .text-paper-soft {
          color: #999999;
        }

        .text-ember {
          color: #2196F3;
        }

        .border-line {
          border-color: #3B3B3B;
        }

        .border-line-dark {
          border-color: #29343A;
        }

        .font-display,
        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }

        /* -------------------------------- */
        /* ANIMATED BACKGROUND */
        /* -------------------------------- */

        .animated-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.18;

          background-image:
            linear-gradient(rgba(33,150,243,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(33,150,243,0.08) 1px, transparent 1px);

          background-size: 55px 55px;

          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 80%
          );

          animation: gridMove 18s linear infinite;
        }

        @keyframes gridMove {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 55px 55px;
          }
        }

        .glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(33,150,243,0.12);
          filter: blur(100px);
          pointer-events: none;
          animation: floatGlow 8s ease-in-out infinite;
        }

        .glow-one {
          top: 50px;
          right: -150px;
        }

        .glow-two {
          top: 500px;
          left: -250px;
          animation-delay: -4s;
        }

        @keyframes floatGlow {
          0%,100% {
            transform: translate(0,0) scale(1);
          }

          50% {
            transform: translate(40px,-30px) scale(1.12);
          }
        }

        /* -------------------------------- */
        /* FLOATING PARTICLES */
        /* -------------------------------- */

        .particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: #2196F3;
          border-radius: 50%;
          opacity: 0.5;
          animation: particleFloat 6s ease-in-out infinite;
        }

        .particle-1 {
          top: 22%;
          left: 12%;
        }

        .particle-2 {
          top: 35%;
          right: 15%;
          animation-delay: -2s;
        }

        .particle-3 {
          top: 70%;
          left: 20%;
          animation-delay: -4s;
        }

        .particle-4 {
          top: 80%;
          right: 25%;
          animation-delay: -1s;
        }

        @keyframes particleFloat {
          0%,100% {
            transform: translateY(0);
            opacity: .25;
          }

          50% {
            transform: translateY(-30px);
            opacity: .8;
          }
        }

        /* -------------------------------- */
        /* NAV */
        /* -------------------------------- */

        .nav-glass {
          background: rgba(31,31,31,0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        /* -------------------------------- */
        /* HERO */
        /* -------------------------------- */

        .hero-title {
          background: linear-gradient(
            120deg,
            #F1F1F1 20%,
            #2196F3 50%,
            #F1F1F1 80%
          );

          background-size: 200% auto;

          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;

          animation: titleGradient 6s linear infinite;
        }

        @keyframes titleGradient {
          to {
            background-position: 200% center;
          }
        }

        .floating {
          animation: floating 5s ease-in-out infinite;
        }

        @keyframes floating {
          0%,100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        /* -------------------------------- */
        /* PHONE */
        /* -------------------------------- */

        .phone-shadow {
          box-shadow:
            0 30px 80px rgba(0,0,0,.55),
            0 0 50px rgba(33,150,243,.12);
        }

        .phone-border {
          border: 1px solid rgba(255,255,255,.08);
        }

        .phone-glow {
          position: absolute;
          inset: -30px;
          border-radius: 50px;
          border: 1px solid rgba(33,150,243,.12);
          animation: phonePulse 3s ease-in-out infinite;
        }

        @keyframes phonePulse {
          0%,100% {
            transform: scale(.98);
            opacity: .3;
          }

          50% {
            transform: scale(1.04);
            opacity: .8;
          }
        }

        .online-dot {
          animation: onlinePulse 1.8s infinite;
        }

        @keyframes onlinePulse {
          0% {
            box-shadow: 0 0 0 0 rgba(33,150,243,.7);
          }

          70% {
            box-shadow: 0 0 0 7px rgba(33,150,243,0);
          }

          100% {
            box-shadow: 0 0 0 0 rgba(33,150,243,0);
          }
        }

        /* -------------------------------- */
        /* MESSAGE ANIMATION */
        /* -------------------------------- */

        @keyframes riseIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(.95);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .bubble-in {
          animation: riseIn .45s cubic-bezier(.2,.8,.2,1) forwards;
        }

        @keyframes dotBounce {
          0%,60%,100% {
            transform: translateY(0);
            opacity: .5;
          }

          30% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }

        .dot {
          animation: dotBounce 1.1s ease-in-out infinite;
        }

        /* -------------------------------- */
        /* BUTTON */
        /* -------------------------------- */

        .cool-button {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .cool-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 80%;
          height: 100%;
          background: linear-gradient(
            100deg,
            transparent,
            rgba(255,255,255,.25),
            transparent
          );

          transform: skewX(-20deg);
          transition: left .7s ease;
          z-index: -1;
        }

        .cool-button:hover::before {
          left: 140%;
        }

        .cool-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(33,150,243,.22);
        }

        /* -------------------------------- */
        /* CARDS */
        /* -------------------------------- */

        .cool-card {
          transition:
            transform .35s ease,
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .cool-card:hover {
          transform: translateY(-7px);
          border-color: rgba(33,150,243,.45);
          box-shadow:
            0 20px 50px rgba(0,0,0,.25),
            0 0 25px rgba(33,150,243,.07);
        }

        .icon-box {
          transition: transform .4s ease;
        }

        .cool-card:hover .icon-box {
          transform: rotate(-8deg) scale(1.08);
        }

        /* -------------------------------- */
        /* SECURITY */
        /* -------------------------------- */

        .security-card {
          position: relative;
          overflow: hidden;
        }

        .security-card::before {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: rgba(255,255,255,.06);
          top: -100px;
          right: -80px;
          animation: securityOrb 6s ease-in-out infinite;
        }

        .security-card::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 50%;
          bottom: -100px;
          left: -50px;
          animation: securityOrb 7s ease-in-out infinite reverse;
        }

        @keyframes securityOrb {
          0%,100% {
            transform: translate(0,0);
          }

          50% {
            transform: translate(-20px,20px);
          }
        }

        /* -------------------------------- */
        /* SCROLL REVEAL */
        /* -------------------------------- */

        .reveal {
          animation: reveal .8s ease both;
        }

        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* -------------------------------- */
        /* MARQUEE */
        /* -------------------------------- */

        .marquee {
          overflow: hidden;
          white-space: nowrap;
          border-top: 1px solid #3B3B3B;
          border-bottom: 1px solid #3B3B3B;
        }

        .marquee-track {
          display: inline-flex;
          gap: 40px;
          animation: marquee 22s linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        /* -------------------------------- */
        /* CONNECTION LINE */
        /* -------------------------------- */

        .connection-line {
          position: absolute;
          height: 1px;
          width: 160px;
          background: linear-gradient(
            90deg,
            transparent,
            #2196F3,
            transparent
          );

          animation: connectionMove 2.5s linear infinite;
        }

        @keyframes connectionMove {
          from {
            transform: translateX(-180px);
          }

          to {
            transform: translateX(180px);
          }
        }
      `}</style>

      {/* BACKGROUND EFFECTS */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="animated-grid" />

        <div className="glow glow-one" />
        <div className="glow glow-two" />

        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
      </div>

      {/* NAV */}

      <header className="sticky top-0 z-50 nav-glass border-b border-line">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a
            href="#top"
            className="font-display text-xl font-semibold tracking-tight flex items-center gap-2"
          >
            <span className="w-7 h-7 rounded-lg bg-ember flex items-center justify-center">
              <MessageCircle size={15} />
            </span>
            G-ChatApp
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-ink-soft hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="/signup"
            className="cool-button bg-ember text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all"
          >
            Login
          </a>
        </div>
      </header>

      <div id="top" />

      {/* HERO */}

      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-16 items-center z-10">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-white-card text-xs text-ink-soft mb-7">
            <span className="w-1.5 h-1.5 bg-ember rounded-full animate-pulse" />
            Private conversations. Better connections.
            <Sparkles size={12} className="text-ember" />
          </div>

          <h1 className="hero-title font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
            Conversations
            <br />
            that keep their
            <br />
            thread.
          </h1>

          <p className="mt-7 text-lg text-ink-soft max-w-md leading-relaxed">
            G-ChatApp keeps every chat, call and file in one place — fast,
            private, and built for how people actually talk.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/signup"
              className="cool-button bg-ember text-white font-medium px-7 py-3.5 rounded-full transition-all flex items-center gap-2"
            >
              Get G-ChatApp for free
              <ArrowUpRight size={17} />
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-ink flex items-center gap-2 group"
            >
              Explore features
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-5 text-xs text-ink-soft">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-ember" />
              Free forever
            </div>

            <div className="flex items-center gap-2">
              <Check size={14} className="text-ember" />
              No ads
            </div>

            <div className="flex items-center gap-2">
              <Check size={14} className="text-ember" />
              Private
            </div>
          </div>
        </div>

        {/* PHONE */}

        <div
          className="flex justify-center md:justify-end relative floating"
          style={{
            transform: `translate(${mouse.x * 0.25}px, ${mouse.y * 0.25}px)`,
          }}
        >
          <div className="absolute w-72 h-72 rounded-full bg-ember opacity-10 blur-3xl" />

          <div className="relative">
            <div className="phone-glow" />

            <div
              className="relative bg-ink rounded-[2.3rem] p-3 phone-shadow phone-border"
              style={{ width: "310px" }}
            >
              {/* PHONE CAMERA */}

              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10 flex items-center justify-end px-2">
                <div className="w-2 h-2 bg-[#23639A] rounded-full animate-pulse" />
              </div>

              <div
                className="bg-white-card rounded-[1.8rem] overflow-hidden flex flex-col"
                style={{ height: "490px" }}
              >
                {/* HEADER */}

                <div className="px-5 pt-7 pb-4 border-b border-line flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-paper text-sm font-semibold">
                      A
                    </div>

                    <span className="online-dot absolute bottom-0 right-0 w-3 h-3 bg-ember rounded-full border-2 border-[#202020]" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold leading-tight">Amara</p>

                    <p className="text-xs text-ember leading-tight mt-1 flex items-center gap-1">
                      <Wifi size={10} />
                      online
                    </p>
                  </div>

                  <Video size={18} className="text-ink-soft" />
                </div>

                {/* MESSAGES */}

                <div className="flex-1 px-4 py-5 flex flex-col gap-2.5 overflow-hidden">
                  <div className="text-center text-[10px] text-ink-soft mb-2">
                    TODAY
                  </div>

                  {messages.slice(0, shown).map((m, i) => (
                    <div
                      key={i}
                      className={`bubble-in max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm ${
                        m.from === "me"
                          ? "bg-ember text-white ml-auto rounded-br-sm"
                          : "bg-[#292929] border border-line rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  ))}

                  {shown >= messages.length && (
                    <div className="bg-[#292929] border border-line rounded-2xl rounded-bl-sm px-3 py-2 flex items-center gap-1 w-fit">
                      <span
                        className="dot w-1.5 h-1.5 rounded-full bg-ink-soft"
                        style={{ animationDelay: "0s" }}
                      />

                      <span
                        className="dot w-1.5 h-1.5 rounded-full bg-ink-soft"
                        style={{ animationDelay: ".15s" }}
                      />

                      <span
                        className="dot w-1.5 h-1.5 rounded-full bg-ink-soft"
                        style={{ animationDelay: ".3s" }}
                      />
                    </div>
                  )}
                </div>

                {/* INPUT */}

                <div className="px-4 py-4 border-t border-line">
                  <div className="bg-paper rounded-full h-10 flex items-center px-4 text-xs text-ink-soft">
                    Message Amara...
                    <span className="ml-auto text-ember">→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING STATUS */}

            <div className="absolute -right-12 top-20 bg-white-card border border-line rounded-xl px-3 py-2 shadow-xl hidden lg:flex items-center gap-2 animate-bounce">
              <Zap size={14} className="text-ember" />

              <span className="text-xs">Connected</span>
            </div>

            <div className="absolute -left-14 bottom-28 bg-white-card border border-line rounded-xl px-3 py-2 shadow-xl hidden lg:flex items-center gap-2">
              <Lock size={14} className="text-ember" />

              <span className="text-xs">Encrypted</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}

      <div className="marquee relative z-10 py-4">
        <div className="marquee-track text-xs text-ink-soft">
          <span>PRIVATE BY DEFAULT</span>
          <span>✦</span>
          <span>REAL-TIME MESSAGING</span>
          <span>✦</span>
          <span>HD VIDEO CALLS</span>
          <span>✦</span>
          <span>SYNC EVERYWHERE</span>
          <span>✦</span>

          <span>PRIVATE BY DEFAULT</span>
          <span>✦</span>
          <span>REAL-TIME MESSAGING</span>
          <span>✦</span>
          <span>HD VIDEO CALLS</span>
          <span>✦</span>
          <span>SYNC EVERYWHERE</span>
          <span>✦</span>
        </div>
      </div>

      {/* FEATURES */}

      <section
        id="features"
        className="relative max-w-6xl mx-auto px-6 py-24 z-10"
      >
        <div className="max-w-2xl reveal">
          <p className="text-ember text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
            <span className="w-6 h-px bg-ember" />
            Features
          </p>

          <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3">
            Built for how people
            <span className="text-ember"> actually talk.</span>
          </h2>

          <p className="text-ink-soft mt-5 max-w-xl leading-relaxed">
            Everything you need to stay connected without the clutter. G-ChatApp
            keeps conversations simple, organized and personal.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {/* SECURITY */}

          <div
            id="security"
            className="security-card bg-teal rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[360px] cool-card"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Lock className="text-paper" size={25} strokeWidth={1.5} />
              </div>

              <h3 className="font-display text-3xl font-semibold text-paper mt-7">
                Private by default.
              </h3>

              <p className="text-paper-soft mt-4 max-w-sm leading-relaxed">
                Every message, call and file is encrypted automatically. No
                setup. No complicated toggles.
              </p>
            </div>

            <div className="relative z-10 mt-10 border-t border-white/10 pt-5 flex items-center justify-between">
              <p className="text-paper-soft text-sm">
                Your conversations stay yours.
              </p>

              <ShieldCheck size={20} className="text-white/60" />
            </div>
          </div>

          {/* SMALL FEATURES */}

          <div className="grid gap-6">
            {smallFeatures.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="cool-card bg-white-card border border-line rounded-2xl p-6 flex gap-5"
              >
                <div className="icon-box shrink-0 w-11 h-11 rounded-xl bg-[#252525] flex items-center justify-center">
                  <Icon className="text-ember" size={22} strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="font-semibold">{title}</h3>

                  <p className="text-ink-soft text-sm mt-2 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRA FEATURES */}

      <section className="relative max-w-6xl mx-auto px-6 pb-24 z-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="cool-card bg-white-card border border-line rounded-2xl p-7">
            <div className="icon-box w-11 h-11 rounded-xl bg-[#252525] flex items-center justify-center">
              <Users className="text-ember" size={23} />
            </div>

            <h3 className="font-display text-xl font-semibold mt-6">
              Stay organized
            </h3>

            <p className="text-ink-soft text-sm mt-2 leading-relaxed">
              Keep conversations, replies and important messages exactly where
              you expect them.
            </p>
          </div>

          <div className="cool-card bg-white-card border border-line rounded-2xl p-7">
            <div className="icon-box w-11 h-11 rounded-xl bg-[#252525] flex items-center justify-center">
              <Video className="text-ember" size={23} />
            </div>

            <h3 className="font-display text-xl font-semibold mt-6">
              Talk face to face
            </h3>

            <p className="text-ink-soft text-sm mt-2 leading-relaxed">
              Jump from messaging into a voice or video call whenever you need a
              more personal conversation.
            </p>
          </div>

          <div className="cool-card bg-white-card border border-line rounded-2xl p-7">
            <div className="icon-box w-11 h-11 rounded-xl bg-[#252525] flex items-center justify-center">
              <Globe className="text-ember" size={23} />
            </div>

            <h3 className="font-display text-xl font-semibold mt-6">
              Everywhere you go
            </h3>

            <p className="text-ink-soft text-sm mt-2 leading-relaxed">
              Your conversations stay synchronized across your phone, tablet and
              computer.
            </p>
          </div>
        </div>
      </section>

      {/* CONNECTION STRIP */}

      <section className="relative overflow-hidden py-5 border-y border-line bg-[#202020]">
        <div className="flex items-center justify-center gap-5 text-xs text-ink-soft">
          <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />

          <span>Your messages are moving in real time</span>

          <div className="connection-line" />

          <Wifi size={14} className="text-ember" />
        </div>
      </section>

      {/* DOWNLOAD */}

      <section
        id="download"
        className="relative bg-ink py-24 scroll-mt-16 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-96 h-96 rounded-full bg-ember blur-[130px] opacity-10 top-0 left-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6">
          <div className="bg-white-card border border-line rounded-[2rem] p-10 md:p-16 text-center cool-card">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-ember flex items-center justify-center shadow-lg shadow-blue-500/10">
              <Download className="text-white" size={28} />
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-7">
              G-ChatApp
              <span className="text-ember"> everywhere.</span>
            </h2>

            <p className="text-ink-soft mt-5 max-w-lg mx-auto leading-relaxed">
              Get Started with the G-ChatApp and keep your conversations with
              you wherever you go. Fast, private and completely free to get
              started.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href="/signup"
                className="cool-button bg-ember text-white font-medium px-8 py-3.5 rounded-full transition-all flex items-center gap-2"
              >
                Get Started for free
                <ArrowUpRight size={17} />
              </a>

              <a
                href="#features"
                className="border border-line text-ink font-medium px-8 py-3.5 rounded-full hover:bg-ink transition-colors"
              >
                View features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="relative bg-teal py-24 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-white/10 blur-[100px] -top-40 -right-40" />

        <div className="absolute w-72 h-72 rounded-full bg-black/10 blur-[100px] -bottom-40 -left-20" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 flex items-center justify-center">
            <ShieldCheck className="text-paper" size={29} strokeWidth={1.5} />
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-semibold text-paper mt-7">
            Start your first
            <br />
            <span className="text-white/70">thread today.</span>
          </h2>

          <p className="text-paper-soft mt-5 max-w-md mx-auto">
            Free to download, free to use, and ready in under a minute.
          </p>

          <a
            href="/signup"
            className="cool-button inline-flex items-center gap-2 mt-9 bg-ember text-white font-medium px-8 py-3.5 rounded-full transition-all"
          >
            Get G-ChatApp for free
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-ink pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <a
                href="#top"
                className="font-display text-xl font-semibold text-paper flex items-center gap-2"
              >
                <span className="w-7 h-7 rounded-lg bg-ember flex items-center justify-center">
                  <MessageCircle size={14} />
                </span>
                G-ChatApp
              </a>

              <p className="text-paper-soft text-sm mt-4 max-w-xs leading-relaxed">
                Conversations that keep their thread.
              </p>
            </div>

            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="text-paper text-sm font-medium">{col.heading}</p>

                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-paper-soft text-sm hover:text-paper transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-line-dark mt-14 pt-7 text-paper-soft flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
            <span>© 2026 G-ChatApp, Inc.</span>

            <span className="text-xl flex items-center">
              Gunit Singh Duggal
            </span>
            <span className="flex items-center gap-2">
              Made for better conversations
              <MessageCircle size={13} className="text-ember" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
