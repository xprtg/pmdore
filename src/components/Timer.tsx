import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, Settings, X } from "lucide-react"
interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const [mode, setMode] = useState<"work" | "break">("work")
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(25 * 60)
  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      // Switch modes when timer ends
      const newMode = mode === "work" ? "break" : "work"
      setMode(newMode)
      setTime(newMode === "work" ? workDuration * 60 : breakDuration * 60)

      // Play sound when timer ends
      const audio = new Audio("/notification.mp3")
      audio.play().catch((e) => console.error("Audio playback failed:", e))
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time, mode, workDuration, breakDuration])

  // Reset timer when mode changes via tabs
  useEffect(() => {
    setTime(mode === "work" ? workDuration * 60 : breakDuration * 60)
    setIsActive(false)
  }, [mode, workDuration, breakDuration])

  // Close settings when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(mode === "work" ? workDuration * 60 : breakDuration * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = mode === "work" ? 1 - time / (workDuration * 60) : 1 - time / (breakDuration * 60)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white"></h1>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="h-9 w-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </button>
        </div>

        {/* Custom Tabs */}
        <div className="w-full grid grid-cols-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setMode("work")}
            className={`py-2 text-sm font-medium transition-colors ${mode === "work"
              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              : "bg-white text-gray-500 hover:text-gray-700 dark:bg-black dark:text-gray-400 dark:hover:text-gray-300"
              }`}
          >
            Work
          </button>
          <button
            onClick={() => setMode("break")}
            className={`py-2 text-sm font-medium transition-colors ${mode === "break"
              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              : "bg-white text-gray-500 hover:text-gray-700 dark:bg-black dark:text-gray-400 dark:hover:text-gray-300"
              }`}
          >
            Break
          </button>
        </div>

        <div className="relative flex aspect-square items-center justify-center">
          {/* Progress circle */}
          <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f1f1f1"
              strokeWidth="4"
              className="dark:stroke-gray-800"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={mode === "work" ? "#ff3b30" : "#34c759"}
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 45 * progress} ${2 * Math.PI * 45 * (1 - progress)}`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="z-10 text-center">
            <div className="text-6xl font-light tracking-tighter text-gray-900 dark:text-white">{formatTime(time)}</div>
            <div className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {mode === "work" ? "Focus time" : "Take a break"}
            </div>
          </div>
        </div>

      </div>

      {/* Custom Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-4 z-50">
          <div
            ref={settingsRef}
            className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md max-h-[85vh] overflow-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Settings</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customize your timer durations</p>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="work-duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Work Duration: {workDuration} minutes
                </label>
                <input
                  id="work-duration"
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={workDuration}
                  onChange={(e) => setWorkDuration(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="break-duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Break Duration: {breakDuration} minutes
                </label>
                <input
                  id="break-duration"
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={breakDuration}
                  onChange={(e) => setBreakDuration(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Timer;