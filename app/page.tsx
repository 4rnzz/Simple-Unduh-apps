"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Download, Star, Users, Search, Menu, X, Gamepad2, Award, Smartphone, MoreVertical } from "lucide-react"

interface AppData {
  name: string
  icon: string
  thumb: string
  desk: string
  version: string
  size: string
  download: string
  subscribe_url: string
  unlock_url: string
}

interface AppList {
  name: string
  authors: string
  listapps: AppData[]
}

export default function PremiumDashboard() {
  const [appData, setAppData] = useState<AppList | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const filteredApps =
    appData?.listapps.filter(
      (app) =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.desk.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  const handleDownload = (downloadUrl: string, appName: string) => {
    window.open(downloadUrl, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-blue-500/20 border-b-blue-500 rounded-full animate-spin mx-auto"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            ></div>
          </div>
        </div>
      </div>
    )
  }

  if (!appData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <X className="h-8 w-8 text-red-400" />
          </div>
          <p className="text-red-400 text-lg font-semibold">Failed to load data</p>
          <p className="text-gray-500">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  const dashboardStats = [
    { label: "Total Downloads", value: "50M+", icon: Download, color: "from-blue-500 to-cyan-500", change: "+12%" },
    { label: "Active Users", value: "2.5M", icon: Users, color: "from-green-500 to-emerald-500", change: "+8%" },
    { label: "App Rating", value: "4.8", icon: Star, color: "from-yellow-500 to-orange-500", change: "+0.2" },
    {
      label: "Available Apps",
      value: appData.listapps.length.toString(),
      icon: Smartphone,
      color: "from-purple-500 to-pink-500",
      change: "+2",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {appData.name}
                </h1>
                <p className="text-xs text-gray-500">by {appData.authors}</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
                Apps
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
                Analytics
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
                Support
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* Search Icon */}
            <div className="hidden md:flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-800/50 bg-black/95 backdrop-blur-xl">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {["Dashboard", "Apps", "Analytics", "Support"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Dashboard */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 text-sm backdrop-blur-sm">
              🚀 Premium Gaming Hub
            </Badge>

            {/* Featured App Thumbnail */}
            <div className="max-w-md mx-auto">
              {appData?.listapps.length > 0 && (
                <Link href={`/download?app=0`}>
                  <div className="group relative overflow-hidden rounded-3xl bg-gray-900/40 border border-gray-800/50 backdrop-blur-sm hover:scale-105 transition-all duration-500 cursor-pointer">
                    {/* Thumbnail Image */}
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={appData.listapps[0].thumb || "/placeholder.svg?height=500&width=400"}
                        alt={appData.listapps[0].name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=500&width=400"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>

                    {/* App Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={appData.listapps[0].icon || "/placeholder.svg"}
                          alt={appData.listapps[0].name}
                          className="w-12 h-12 rounded-xl border border-gray-600/50"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=48&width=48"
                          }}
                        />
                        <div className="space-y-1">
                          <Badge className="bg-black/50 text-white border-0 text-sm backdrop-blur-sm">
                            {appData.listapps[0].size}
                          </Badge>
                          <div className="text-xs text-gray-300">v{appData.listapps[0].version}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-white font-bold text-2xl group-hover:text-purple-300 transition-colors">
                          {appData.listapps[0].name}
                        </h3>
                        <p className="text-gray-300 text-sm line-clamp-2">{appData.listapps[0].desk}</p>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl text-lg">
                        <Download className="mr-2 h-5 w-5" />
                        Download Now
                      </Button>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none"></div>
                  </div>
                </Link>
              )}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
              {dashboardStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-900/40 border border-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center group hover:bg-gray-900/60 transition-all duration-300"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                  <div className="text-xs text-green-400 mt-1">{stat.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      

      {/* Apps List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Apps List Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Badge className="bg-gray-800/50 text-gray-300 border-gray-700/50">
                {filteredApps.length} apps found
              </Badge>
            </div>
          </div>
          <div className="space-y-4">
            {filteredApps.map((app, index) => (
              <Card
                key={index}
                className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    {/* App Icon */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={app.icon || "/placeholder.svg"}
                        alt={app.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-gray-700/50 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=64&width=64"
                        }}
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-black flex items-center justify-center">
                        <Award className="h-2.5 w-2.5 text-white" />
                      </div>
                    </div>

                    {/* App Info */}
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <Link href={`/download?app=${index}`}>
                            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 cursor-pointer hover:underline">
                              {app.name}
                            </h3>
                          </Link>
                          <p className="text-gray-400 text-sm">
                            <span className="text-purple-400 font-medium">{appData.authors}</span> • Premium
                          </p>

                          <div className="flex items-center space-x-4 mt-2">
                            <Badge className="bg-gray-800/50 text-gray-300 border-0 text-xs">v{app.version}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link href={`/download?app=${index}`}></Link>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredApps.length === 0 && (
            <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No apps found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search terms or filters</p>
                <Button
                  variant="outline"
                  className="border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-800/50"
                >
                  Clear filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

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
            <p className="text-gray-400 text-sm">© 2025 {appData?.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
