"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, ArrowLeft, Gamepad2, AlertTriangle, RefreshCw } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Card className="bg-gray-900/40 border-gray-800/50 backdrop-blur-sm">
          <CardContent className="p-12 space-y-8">

            {/* Error Message */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Page Not Found
              </h1>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the
                wrong URL.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 text-lg w-full sm:w-auto">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
