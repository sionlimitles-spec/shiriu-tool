"use client";

let isMuted = false;
if (typeof window !== "undefined") { isMuted = localStorage.getItem("shiriu_mute") === "true"; }

export const toggleMute = () => {
  isMuted = !isMuted;
  if (typeof window !== "undefined") { localStorage.setItem("shiriu_mute", String(isMuted)); }
  return isMuted;
};

export const getMuteState = () => isMuted;

export const playSound = (type: "click" | "success" | "error") => {
  if (isMuted || typeof window === "undefined") return;
  let src = "";
  if (type === "click") src = "/sounds/click.mp3";
  if (type === "success") src = "/sounds/success.mp3";
  if (type === "error") src = "/sounds/error.mp3";
  
  const audio = new Audio(src);
  audio.volume = 0.3;
  audio.play().catch(() => { /* Abaikan error jika file mp3 belum ada */ });
};
