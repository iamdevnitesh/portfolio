"use client";

import { useEffect, useMemo, useState } from "react";
import { highlights, timeline } from "@/lib/content";

type Project = {
  title: string;
  summary: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: "Multi-Agent Retail Analytics Platform",
    summary: "Google ADK + BigQuery sub-agents with Redis sessions and query routing.",
    tags: ["Node.js", "TypeScript", "Redis", "BigQuery", "GCP", "Kafka"]
  },
  {
    title: "OLTP → OLAP Data Platform",
    summary: "End-to-end data pipelines with validation and reconciliation for reporting accuracy.",
    tags: ["Python", "Java", "BigQuery", "Kafka", "GCP"]
  },
  {
    title: "Cloud-Native Ad Infrastructure",
    summary: "High-throughput backend services on GCP + Kubernetes with SLA-focused reliability.",
    tags: ["Go", "Node.js", "Kubernetes", "GCP", "Redis", "Kafka"]
  }
];

const baseSkills = ["Node.js", "Python", "Java", "Go", "TypeScript", "GCP", "BigQuery", "Kubernetes", "Redis", "Kafka"];
const GITHUB_USER = "iamdevnitesh";

export default function PortfolioPage() {
  const [dark, setDark] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState("Node.js");
  const [runtimeSkills, setRuntimeSkills] = useState<string[]>(baseSkills);
  const [rot, setRot] = useState({ x: 18, y: -14 });
  const [dragging, setDragging] = useState(false);
  const [last, setLast] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=30&sort=updated`, {
      headers: { Accept: "application/vnd.github+json" }
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((repos: Array<{ fork?: boolean; language?: string }>) => {
        if (cancelled || !Array.isArray(repos)) return;
        const deny = new Set(["HTML", "CSS", "Jupyter Notebook", "Vim Script"]);
        const langs = Array.from(
          new Set(
            repos
              .filter((r) => !r.fork)
              .map((r) => r.language)
              .filter((x): x is string => !!x && !deny.has(x) && !x.includes(" "))
          )
        ).slice(0, 8);
        const merged = Array.from(new Set([...langs, "GCP", "BigQuery", "Kubernetes", "Redis", "Kafka"])).slice(0, 10);
        if (merged.length) {
          setRuntimeSkills(merged);
          if (!merged.includes(selectedSkill)) setSelectedSkill(merged[0]);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [selectedSkill]);

  const skills = runtimeSkills;
  const matchedProjects = projects.filter((p) => p.tags.includes(selectedSkill));

  const nodes = useMemo(() => {
    return skills.map((s, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const x = Math.cos(angle) * 110;
      const y = Math.sin(angle) * 70;
      const z = Math.sin(angle * 1.7) * 60;
      return { s, x, y, z };
    });
  }, [skills]);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    setLast({ x: e.clientX, y: e.clientY });
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    setRot((r) => ({ x: Math.max(-45, Math.min(45, r.x - dy * 0.2)), y: r.y + dx * 0.25 }));
    setLast({ x: e.clientX, y: e.clientY });
  };

  const onUp = () => setDragging(false);

  const title = "Building Frontend Systems That Scale.".split(" ");

  return (
    <div className={dark ? "theme-dark" : "theme-light"}>
      <main className="relative min-h-screen overflow-x-clip bg-bg text-slate-100 transition-colors duration-500">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(110,168,255,.18),transparent_38%)]" />

        <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <p className="font-semibold">Nitesh Kumar</p>
            <button
              aria-label="Toggle theme"
              className="relative h-9 w-28 rounded-full border border-white/20 bg-white/5 p-1"
              onClick={() => setDark((v) => !v)}
            >
              <span className="absolute inset-y-1 left-1 right-1 z-10 grid grid-cols-2 items-center text-xs font-medium">
                <span className={`text-center ${dark ? "text-slate-100" : "text-slate-400"}`}>Dark</span>
                <span className={`text-center ${dark ? "text-slate-400" : "text-slate-100"}`}>Light</span>
              </span>
              <span className={`absolute top-1 h-7 w-[calc(50%-4px)] rounded-full bg-accent/90 transition-all duration-500 ${dark ? "left-1" : "left-[calc(50%+2px)]"}`} />
            </button>
          </div>
        </header>

        <section className="mx-auto grid min-h-[88vh] max-w-6xl items-center gap-8 px-6 py-16 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-accent/90">Backend Engineer · Distributed Systems · Cloud-Native Architect</p>
            <h1 className="text-fluidH1 font-semibold leading-[1.05]">
              {title.map((w, i) => (
                <span key={`${w}-${i}`} className="mr-2 inline-block">{w}</span>
              ))}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              Backend Engineer building scalable distributed systems and cloud-native data platforms. Specialized in GCP, Kubernetes,
              BigQuery, and high-performance Node.js services.
            </p>
          </div>
          <div className="grid gap-3">
            {highlights.map((h) => (
              <div key={h} className="rounded-xl border border-white/10 bg-panel/70 p-4 backdrop-blur-xl">{h}</div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-fluidH2 font-semibold">Experience Timeline</h2>
          <div className="mt-6 grid gap-6">
            {timeline.map((item) => (
              <article key={item.role} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <p className="text-sm text-slate-400">{item.period}</p>
                <h3 className="mt-1 text-xl font-semibold">{item.role} · {item.company}</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                  {item.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-fluidH2 font-semibold">Interactive Skill Graph</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className={`rounded-2xl border p-5 ${dark ? "border-slate-700/50 bg-slate-900/45" : "border-slate-300/60 bg-white/55"}`} style={{ backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" }}>
              <div
                className="relative h-72 w-full cursor-grab active:cursor-grabbing select-none overflow-hidden rounded-xl border border-white/10"
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerLeave={onUp}
              >
                <div className="absolute inset-0 grid place-items-center [transform-style:preserve-3d]" style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}>
                  <div className="absolute h-4 w-4 rounded-full bg-accent shadow-[0_0_20px_rgba(110,168,255,.7)]" />
                  {nodes.map((n) => (
                    <button
                      key={n.s}
                      onClick={() => setSelectedSkill(n.s)}
                      className={`absolute rounded-full border px-2 py-0.5 text-[11px] ${selectedSkill === n.s ? "border-accent bg-accent/25" : "border-white/25 bg-black/35"}`}
                      style={{ transform: `translate3d(${n.x}px, ${n.y}px, ${n.z}px)` }}
                    >
                      {n.s}
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-400">Drag to rotate</p>
            </div>

            <div className={`rounded-2xl border p-5 ${dark ? "border-slate-700/50 bg-slate-900/45" : "border-slate-300/60 bg-white/55"}`} style={{ backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" }}>
              <p className="text-sm text-slate-400">Projects using {selectedSkill}</p>
              <div className="mt-3 space-y-3">
                {matchedProjects.length > 0 ? (
                  matchedProjects.map((p) => (
                    <div key={`${selectedSkill}-${p.title}`} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="font-medium">{p.title}</p>
                      <p className="mt-1 text-sm text-slate-300">{p.summary}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">No mapped project yet.</div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-fluidH2 font-semibold">Projects</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projects.map((p) => (
              <article key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{p.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-fluidH2 font-semibold">Education</h2>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="font-semibold">Bachelor of Technology (Information Technology)</p>
            <p className="mt-1 text-slate-300">Vishwakarma Institute of Information Technology (Pune University)</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20 pt-8">
          <h2 className="text-fluidH2 font-semibold">Contact</h2>
          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-2xl">
            <p className="text-slate-300">i.am.dev.nitesh@gmail.com · +91-9067155181</p>
            <p className="mt-2 text-slate-300">linkedin.com/in/iamdevnitesh · github.com/iamdevnitesh</p>
          </div>
        </section>
      </main>
    </div>
  );
}
