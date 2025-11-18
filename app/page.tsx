'use client'

import { useState, useRef, useEffect } from 'react'
import { toPng } from 'html-to-image'
import { Download, Wand2, Palette, Type, Sparkles } from 'lucide-react'

interface LogoConfig {
  campaignName: string
  industry: string
  style: string
  colorScheme: string
  fontSize: string
  fontWeight: string
  bgType: string
  iconType: string
}

const gradients = {
  sunset: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  ocean: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  forest: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  fire: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  midnight: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  royal: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gold: 'linear-gradient(135deg, #f4d03f 0%, #16a085 100%)',
  electric: 'linear-gradient(135deg, #00d2ff 0%, #3a47d5 100%)',
}

const solidColors = {
  blue: '#1877f2',
  purple: '#8b5cf6',
  green: '#10b981',
  orange: '#f97316',
  pink: '#ec4899',
  red: '#ef4444',
  teal: '#14b8a6',
  indigo: '#6366f1',
}

const icons = {
  sparkle: '✨',
  star: '⭐',
  rocket: '🚀',
  fire: '🔥',
  heart: '❤️',
  diamond: '💎',
  crown: '👑',
  target: '🎯',
  megaphone: '📢',
  chart: '📈',
  trophy: '🏆',
  gift: '🎁',
}

export default function Home() {
  const [config, setConfig] = useState<LogoConfig>({
    campaignName: 'Summer Sale',
    industry: 'Retail',
    style: 'modern',
    colorScheme: 'gradient-sunset',
    fontSize: '48',
    fontWeight: '700',
    bgType: 'gradient',
    iconType: 'sparkle',
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShowDownload(false)
  }, [config])

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowDownload(true)
    }, 1000)
  }

  const handleDownload = async () => {
    if (logoRef.current === null) return

    try {
      const dataUrl = await toPng(logoRef.current, {
        cacheBust: true,
        width: 1200,
        height: 1200,
        pixelRatio: 2,
      })
      const link = document.createElement('a')
      link.download = `${config.campaignName.replace(/\s+/g, '-').toLowerCase()}-logo.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to download logo:', err)
    }
  }

  const getBackground = () => {
    if (config.bgType === 'gradient') {
      const gradientKey = config.colorScheme.replace('gradient-', '') as keyof typeof gradients
      return gradients[gradientKey] || gradients.sunset
    } else {
      const solidKey = config.colorScheme.replace('solid-', '') as keyof typeof solidColors
      return solidColors[solidKey] || solidColors.blue
    }
  }

  const getIcon = () => {
    return icons[config.iconType as keyof typeof icons] || icons.sparkle
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-12 h-12 text-yellow-400" />
            Meta Campaign Logo Generator
          </h1>
          <p className="text-xl text-gray-300">Create stunning logos for your Facebook & Instagram campaigns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Control Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Wand2 className="w-6 h-6" />
              Campaign Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Campaign Name</label>
                <input
                  type="text"
                  value={config.campaignName}
                  onChange={(e) => setConfig({...config, campaignName: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter campaign name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Industry</label>
                <select
                  value={config.industry}
                  onChange={(e) => setConfig({...config, industry: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Retail">Retail</option>
                  <option value="Technology">Technology</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Finance">Finance</option>
                  <option value="Health">Health</option>
                  <option value="Travel">Travel</option>
                  <option value="Education">Education</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Background Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setConfig({...config, bgType: 'gradient', colorScheme: 'gradient-sunset'})}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      config.bgType === 'gradient'
                        ? 'bg-purple-600 text-white scale-105'
                        : 'bg-white/20 text-gray-200 hover:bg-white/30'
                    }`}
                  >
                    Gradient
                  </button>
                  <button
                    onClick={() => setConfig({...config, bgType: 'solid', colorScheme: 'solid-blue'})}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      config.bgType === 'solid'
                        ? 'bg-purple-600 text-white scale-105'
                        : 'bg-white/20 text-gray-200 hover:bg-white/30'
                    }`}
                  >
                    Solid
                  </button>
                </div>
              </div>

              {config.bgType === 'gradient' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Gradient Style</label>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.keys(gradients).map((key) => (
                      <button
                        key={key}
                        onClick={() => setConfig({...config, colorScheme: `gradient-${key}`})}
                        className={`h-12 rounded-lg transition-all ${
                          config.colorScheme === `gradient-${key}`
                            ? 'ring-4 ring-white scale-110'
                            : 'hover:scale-105'
                        }`}
                        style={{ background: gradients[key as keyof typeof gradients] }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Color</label>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.keys(solidColors).map((key) => (
                      <button
                        key={key}
                        onClick={() => setConfig({...config, colorScheme: `solid-${key}`})}
                        className={`h-12 rounded-lg transition-all ${
                          config.colorScheme === `solid-${key}`
                            ? 'ring-4 ring-white scale-110'
                            : 'hover:scale-105'
                        }`}
                        style={{ background: solidColors[key as keyof typeof solidColors] }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Icon</label>
                <div className="grid grid-cols-6 gap-2">
                  {Object.keys(icons).map((key) => (
                    <button
                      key={key}
                      onClick={() => setConfig({...config, iconType: key})}
                      className={`h-14 text-2xl rounded-lg transition-all ${
                        config.iconType === key
                          ? 'bg-purple-600 scale-110 ring-2 ring-white'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {icons[key as keyof typeof icons]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Font Size
                </label>
                <input
                  type="range"
                  min="24"
                  max="72"
                  value={config.fontSize}
                  onChange={(e) => setConfig({...config, fontSize: e.target.value})}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-gray-300 text-sm mt-1">{config.fontSize}px</div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Logo
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Logo Preview */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Logo Preview</h2>

            <div className="bg-white/5 rounded-xl p-8 mb-6">
              <div
                ref={logoRef}
                className="w-full aspect-square rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-6 p-8"
                style={{
                  background: getBackground(),
                }}
              >
                <div className="text-7xl animate-pulse">
                  {getIcon()}
                </div>
                <div
                  className="text-center text-white font-bold leading-tight break-words max-w-full px-4"
                  style={{
                    fontSize: `${config.fontSize}px`,
                    fontWeight: config.fontWeight,
                    textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  {config.campaignName}
                </div>
                <div className="text-white/90 text-xl font-medium">
                  {config.industry}
                </div>
              </div>
            </div>

            {showDownload && (
              <button
                onClick={handleDownload}
                className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg animate-bounce"
              >
                <Download className="w-5 h-5" />
                Download Logo (1200x1200)
              </button>
            )}

            <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Meta Campaign Tips
              </h3>
              <ul className="text-gray-200 text-sm space-y-1">
                <li>• Use vibrant colors to stand out in feeds</li>
                <li>• Keep text concise and readable</li>
                <li>• Optimize for mobile viewing</li>
                <li>• A/B test different logo variations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Perfect for Facebook Ads, Instagram Stories, and Meta Business Suite</p>
        </div>
      </div>
    </main>
  )
}
