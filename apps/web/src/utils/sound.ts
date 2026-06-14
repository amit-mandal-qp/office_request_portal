export function playNotificationSound(urgency: string) {
  try {
    const ctx = new AudioContext()

    if (urgency === 'URGENT') {
      // Three sharp beeps
      ;[0, 0.18, 0.36].forEach(delay => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'square'
        osc.frequency.value = 880
        gain.gain.setValueAtTime(0.25, ctx.currentTime + delay)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.12)
        osc.start(ctx.currentTime + delay)
        osc.stop(ctx.currentTime + delay + 0.12)
      })
      setTimeout(() => ctx.close(), 800)
    } else {
      // Gentle two-note chime: C5 → E5
      const notes = [523, 659]
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0.18, ctx.currentTime + i * 0.18)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.5)
        osc.start(ctx.currentTime + i * 0.18)
        osc.stop(ctx.currentTime + i * 0.18 + 0.5)
      })
      setTimeout(() => ctx.close(), 1000)
    }
  } catch {
    // AudioContext blocked (e.g. no user gesture yet) — silent fail
  }
}
