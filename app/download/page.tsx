"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Download,
  Star,
  Users,
  ArrowLeft,
  Shield,
  Zap,
  Smartphone,
  Lock,
  Unlock,
  CheckCircle,
  ExternalLink,
  Gamepad2,
  Youtube,
  MessageCircle,
  Instagram,
  Globe,
  FileText,
  ChevronRight,
} from "lucide-react"

interface UnlockStep {
  title: string
  url: string
  icon: string
}

interface AppData {
  name: string
  icon: string
  thumb: string
  desk: string
  version: string
  size: string
  download: string
  unlock_steps: UnlockStep[]
}

interface AppList {
  name: string
  authors: string
  listapps: AppData[]
}

function DownloadPageContent() {
  const searchParams = useSearchParams()
  const appIndex = searchParams.get("app")
  const [appData, setAppData] = useState<AppList | null>(null)
  const [loading, setLoading] = useState(true)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false, false])
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showUnlockSteps, setShowUnlockSteps] = useState(false)

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const response = await fetch("/api/apps")
        const data = await response.json()
        setAppData(data)
      } catch (error) {
        console.error("Error fetching app data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppData()
  }, [])

  const currentApp = appData?.listapps[Number.parseInt(appIndex || "0")] || null
  const completedCount = completedSteps.filter(Boolean).length
  const unlockProgress = (completedCount / 5) * 100
  const isFullyUnlocked = completedCount === 5

  const getStepIcon = (iconType: string) => {
    switch (iconType) {
      case "youtube":
        return <Youtube className="h-5 w-5" />
      case "telegram":
        return <MessageCircle className="h-5 w-5" />
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "website":
        return <Globe className="h-5 w-5" />
      case "survey":
        return <FileText className="h-5 w-5" />
      default:
        return <ExternalLink className="h-5 w-5" />
    }
  }

  const getStepColor = (iconType: string) => {
    switch (iconType) {
      case "youtube":
        return "from-red-500 to-red-600"
      case "telegram":
        return "from-blue-500 to-blue-600"
      case "instagram":
        return "from-pink-500 to-purple-600"
      case "website":
        return "from-green-500 to-green-600"
      case "survey":
        return "from-orange-500 to-orange-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const handleStepClick = (stepIndex: number, url: string) => {
    window.open(url, "_blank")

    setTimeout(() => {
      setCompletedSteps((prev) => {
        const newSteps = [...prev]
        newSteps[stepIndex] = true
        return newSteps
      })
    }, 3000)
  }

  const handleDownload = (downloadUrl: string) => {
    if (!isFullyUnlocked) return

    setIsDownloading(true)
    setDownloadProgress(0)

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          window.open(downloadUrl, "_blank")
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
          </div>
          <div className="space-y-2">
            <p className="text-white text-xl font-semibold">FF BETA</p>
          </div>
        </div>
      </div>
    )
  }

  if (!currentApp) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">App Not Found</h1>
          <p className="text-gray-400">The requested app could not be found.</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {appData?.name}
                </h1>
                <p className="text-xs text-gray-500">by {appData?.authors}</p>
              </div>
            </Link>

            <Link href="/">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Apps
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* App Details */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* App Thumbnail */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl bg-gray-900/40 border border-gray-800/50 backdrop-blur-sm">
                <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                      <Gamepad2 className="h-12 w-12 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">{currentApp.name}</h3>
                      <p className="text-gray-300">Gaming Application</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* App Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Downloads", value: "1M+", icon: Download },
                  { label: "Rating", value: "4.8", icon: Star },
                  { label: "Users", value: "500K", icon: Users },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/40 border border-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center"
                  >
                    <stat.icon className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* App Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Gamepad2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {currentApp.name}
                    </h1>
                    <p className="text-gray-400">by {appData?.authors}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge className="bg-gray-800/50 text-gray-300 border-0">v{currentApp.version}</Badge>
                  <Badge className="bg-gray-800/50 text-gray-300 border-0">{currentApp.size}</Badge>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-gray-400 text-sm ml-2">4.8 (2.1K reviews)</span>
                  </div>
                </div>

                
              </div>

              {/* Unlock Progress */}
              <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {isFullyUnlocked ? (
                        <Unlock className="h-6 w-6 text-green-400" />
                      ) : (
                        <Lock className="h-6 w-6 text-orange-400" />
                      )}
                      <h3 className="text-xl font-bold text-white">
                        {isFullyUnlocked ? "Download Ready!" : "Unlock Progress"}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{completedCount}/5</div>
                      <div className="text-xs text-gray-400">Steps Complete</div>
                    </div>
                  </div>

                  {/* Overall Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Overall Progress</span>
                      <span className="text-white">{Math.round(unlockProgress)}%</span>
                    </div>
                    <Progress value={unlockProgress} className="h-3" />
                  </div>

                  {!isFullyUnlocked && (
                    <div className="space-y-4">
                      

                      <Button
                        onClick={() => setShowUnlockSteps(!showUnlockSteps)}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      >
                        {showUnlockSteps ? "Hide" : "Show"} Unlock Steps
                        <ChevronRight
                          className={`ml-2 h-4 w-4 transition-transform ${showUnlockSteps ? "rotate-90" : ""}`}
                        />
                      </Button>

                      {showUnlockSteps && (
                        <div className="space-y-3 mt-4">
                          {currentApp.unlock_steps.map((step, index) => (
                            <div
                              key={index}
                              className={`flex items-center space-x-4 p-4 rounded-xl border transition-all duration-300 ${
                                completedSteps[index]
                                  ? "bg-green-900/20 border-green-500/30"
                                  : "bg-gray-800/50 border-gray-700/50 hover:border-gray-600/50"
                              }`}
                            >
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                                  completedSteps[index] ? "bg-green-500" : `bg-gradient-to-r ${getStepColor(step.icon)}`
                                }`}
                              >
                                {completedSteps[index] ? <CheckCircle className="h-6 w-6" /> : getStepIcon(step.icon)}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-semibold">{step.title}</h4>
                                <p className="text-gray-400 text-sm">
                                  {completedSteps[index] ? "Completed!" : "Click to complete this step"}
                                </p>
                              </div>
                              <Button
                                onClick={() => handleStepClick(index, step.url)}
                                disabled={completedSteps[index]}
                                size="sm"
                                className={
                                  completedSteps[index]
                                    ? "bg-green-500 hover:bg-green-500 cursor-default"
                                    : `bg-gradient-to-r ${getStepColor(step.icon)} hover:opacity-90`
                                }
                              >
                                {completedSteps[index] ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <ExternalLink className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {isFullyUnlocked && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-green-400">
                        <CheckCircle className="h-5 w-5" />
                        <span>All steps completed! Download is now available.</span>
                      </div>

                      {isDownloading ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Downloading...</span>
                            <span className="text-white">{downloadProgress}%</span>
                          </div>
                          <Progress value={downloadProgress} className="h-3" />
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleDownload(currentApp.download)}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 text-lg"
                        >
                          <Download className="mr-2 h-6 w-6" />
                          Download Now ({currentApp.size})
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-white">{appData?.name}</h4>
            </div>
            <Separator className="my-8 bg-gray-800/50" />
            <p className="text-gray-400 text-sm">© 2024 {appData?.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function DownloadPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
            </div>
            <div className="space-y-2">
              <p className="text-white text-xl font-semibold">Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <DownloadPageContent />
    </Suspense>
  )
}
