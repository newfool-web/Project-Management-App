"use client"

import { baseURL } from "@/lib/base-url"
import { Button } from "../ui/button"

const GoogleOauthButton = (props: { label: string }) => {
  const { label } = props

  const handleClick = () => {
    window.location.href = `${baseURL}/auth/google`
  }

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      type="button"
      className="w-full h-12 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md group"
    >
      <div className="flex items-center justify-center gap-3">
        {/* Google Logo with authentic colors */}
        <svg
          className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>

        <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
          {label} 
        </span>
      </div>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-red-50/0 to-yellow-50/0 group-hover:from-blue-50/20 group-hover:via-red-50/10 group-hover:to-yellow-50/20 rounded-xl transition-all duration-300 pointer-events-none"></div>
    </Button>
  )
}

export default GoogleOauthButton
