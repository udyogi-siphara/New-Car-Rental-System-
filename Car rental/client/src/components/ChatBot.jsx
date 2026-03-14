import React, { useState, useRef, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'motion/react'

const ChatBot = () => {
  const { cars, currency, navigate } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I'm your CarRental assistant. I can help you find the perfect car. Try asking me things like:\n\n• \"Show me SUVs\"\n• \"Cars under 200\"\n• \"I need a car in Colombo\"\n• \"Best car for a family\"\n• \"What fuel types are available?\"\n• \"Compare sedans\"",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // --- Intelligent car matching engine ---

  const findCarsByCategory = (category) =>
    cars.filter((c) => c.category?.toLowerCase() === category.toLowerCase())

  const findCarsByFuel = (fuel) =>
    cars.filter((c) => c.fuel_type?.toLowerCase().includes(fuel.toLowerCase()))

  const findCarsByLocation = (loc) =>
    cars.filter((c) => c.location?.toLowerCase().includes(loc.toLowerCase()))

  const findCarsByBudget = (maxPrice) =>
    cars.filter((c) => c.pricePerDay <= maxPrice)

  const findCarsBySeats = (minSeats) =>
    cars.filter((c) => c.seating_capacity >= minSeats)

  const findCarsByBrand = (brand) =>
    cars.filter((c) => c.brand?.toLowerCase().includes(brand.toLowerCase()))

  const findCarsByTransmission = (trans) =>
    cars.filter((c) => c.transmisson?.toLowerCase().includes(trans.toLowerCase()))

  const formatCarList = (list, limit = 4) => {
    if (list.length === 0) return "I couldn't find any cars matching that. Try different criteria!"
    const capped = list.slice(0, limit)
    let result = capped
      .map(
        (c) =>
          `🚗 **${c.brand} ${c.model}** (${c.year})\n   ${c.category} • ${c.fuel_type} • ${c.seating_capacity} seats\n   📍 ${c.location} — ${currency} ${c.pricePerDay}/day`
      )
      .join('\n\n')
    if (list.length > limit)
      result += `\n\n...and ${list.length - limit} more. Type "show all" or browse the Cars page!`
    return result
  }

  const getCheapest = () => {
    if (cars.length === 0) return null
    return cars.reduce((min, c) => (c.pricePerDay < min.pricePerDay ? c : min), cars[0])
  }

  const getMostExpensive = () => {
    if (cars.length === 0) return null
    return cars.reduce((max, c) => (c.pricePerDay > max.pricePerDay ? c : max), cars[0])
  }

  const getUniqueValues = (key) => [...new Set(cars.map((c) => c[key]).filter(Boolean))]

  // --- Process user message ---

  const processMessage = (msg) => {
    const lower = msg.toLowerCase().trim()

    // Greetings
    if (/^(hi|hello|hey|howdy|sup|yo|greetings)/i.test(lower)) {
      return "Hello! 👋 I'm here to help you find the perfect rental car. What are you looking for? You can ask about car types, budgets, locations, or specific brands!"
    }

    // Thanks
    if (/^(thanks|thank you|thx|cheers)/i.test(lower)) {
      return "You're welcome! 😊 Let me know if you need anything else. Happy driving!"
    }

    // Show all cars
    if (/show all|all cars|every car|list all/i.test(lower)) {
      return formatCarList(cars, 6)
    }

    // Category searches
    if (/\bsuv\b/i.test(lower)) {
      const results = findCarsByCategory('SUV')
      return `Here are our available SUVs:\n\n${formatCarList(results)}`
    }
    if (/\bsedan\b/i.test(lower)) {
      const results = findCarsByCategory('Sedan')
      return `Here are our sedans:\n\n${formatCarList(results)}`
    }
    if (/\bvan\b/i.test(lower)) {
      const results = findCarsByCategory('Van')
      return `Here are our vans:\n\n${formatCarList(results)}`
    }

    // Budget searches
    const budgetMatch = lower.match(/(?:under|below|less than|max|budget|within)\s*(\d+)/)
    if (budgetMatch) {
      const maxPrice = parseInt(budgetMatch[1])
      const results = findCarsByBudget(maxPrice)
      return `Cars under ${currency} ${maxPrice}/day:\n\n${formatCarList(results)}`
    }
    const priceRangeMatch = lower.match(/(\d+)\s*(?:to|-)\s*(\d+)/)
    if (priceRangeMatch && /price|budget|cost|range|between/i.test(lower)) {
      const min = parseInt(priceRangeMatch[1])
      const max = parseInt(priceRangeMatch[2])
      const results = cars.filter((c) => c.pricePerDay >= min && c.pricePerDay <= max)
      return `Cars between ${currency} ${min} - ${currency} ${max}/day:\n\n${formatCarList(results)}`
    }

    // Location searches
    const locations = getUniqueValues('location')
    for (const loc of locations) {
      if (lower.includes(loc.toLowerCase())) {
        const results = findCarsByLocation(loc)
        return `Cars available in ${loc}:\n\n${formatCarList(results)}`
      }
    }

    // Brand searches
    const brands = getUniqueValues('brand')
    for (const brand of brands) {
      if (lower.includes(brand.toLowerCase().trim())) {
        const results = findCarsByBrand(brand)
        return `Here are ${brand} cars we have:\n\n${formatCarList(results)}`
      }
    }

    // Fuel type searches
    if (/\b(electric|ev)\b/i.test(lower)) {
      const results = findCarsByFuel('electric')
      return results.length > 0
        ? `Electric vehicles available:\n\n${formatCarList(results)}`
        : "We don't have electric cars right now. Check back soon or try hybrid options! Type \"hybrid\" to see them."
    }
    if (/\bhybrid\b/i.test(lower)) {
      const results = findCarsByFuel('hybrid')
      return `Hybrid cars available:\n\n${formatCarList(results)}`
    }
    if (/\bdiesel\b/i.test(lower)) {
      const results = findCarsByFuel('diesel')
      return `Diesel cars available:\n\n${formatCarList(results)}`
    }
    if (/\bpetrol\b/i.test(lower)) {
      const results = findCarsByFuel('petrol')
      return `Petrol cars available:\n\n${formatCarList(results)}`
    }
    if (/\bgas\b/i.test(lower)) {
      const results = findCarsByFuel('gas')
      return `Gas cars available:\n\n${formatCarList(results)}`
    }

    // Transmission searches
    if (/\bautomatic\b/i.test(lower)) {
      const results = findCarsByTransmission('automatic')
      return `Automatic cars:\n\n${formatCarList(results)}`
    }
    if (/\bmanual\b/i.test(lower)) {
      const results = findCarsByTransmission('manual')
      return `Manual transmission cars:\n\n${formatCarList(results)}`
    }

    // Family / seating
    if (/\bfamily\b|large group|big group|many seats|spacious/i.test(lower)) {
      const results = findCarsBySeats(4).sort((a, b) => b.seating_capacity - a.seating_capacity)
      return `Great family-friendly cars with 4+ seats:\n\n${formatCarList(results)}`
    }
    const seatMatch = lower.match(/(\d+)\s*(?:seat|passenger|people|person)/)
    if (seatMatch) {
      const seats = parseInt(seatMatch[1])
      const results = findCarsBySeats(seats)
      return `Cars with ${seats}+ seats:\n\n${formatCarList(results)}`
    }

    // Cheapest / most affordable
    if (/cheap|affordable|lowest price|budget.?friendly|best deal|most affordable/i.test(lower)) {
      const cheapest = getCheapest()
      if (cheapest) {
        return `💰 Our most affordable option:\n\n🚗 **${cheapest.brand} ${cheapest.model}** (${cheapest.year})\n   ${cheapest.category} • ${cheapest.fuel_type} • ${cheapest.seating_capacity} seats\n   📍 ${cheapest.location} — ${currency} ${cheapest.pricePerDay}/day\n\nWant me to show more budget options? Try "cars under ${cheapest.pricePerDay + 50}"`
      }
    }

    // Most expensive / luxury / premium
    if (/expensive|luxury|premium|top.?end|high.?end|best car|most expensive/i.test(lower)) {
      const expensive = getMostExpensive()
      if (expensive) {
        return `✨ Our premium pick:\n\n🚗 **${expensive.brand} ${expensive.model}** (${expensive.year})\n   ${expensive.category} • ${expensive.fuel_type} • ${expensive.seating_capacity} seats\n   📍 ${expensive.location} — ${currency} ${expensive.pricePerDay}/day\n\nLooking for luxury? This is our top choice!`
      }
    }

    // Compare categories
    if (/compare|difference|vs|versus/i.test(lower)) {
      const suvs = findCarsByCategory('SUV')
      const sedans = findCarsByCategory('Sedan')
      const vans = findCarsByCategory('Van')
      return `📊 **Car Comparison by Category:**\n\n🏔️ **SUVs** (${suvs.length} available)\n   Perfect for adventure & families\n   Price range: ${suvs.length > 0 ? `${currency} ${Math.min(...suvs.map((c) => c.pricePerDay))} - ${currency} ${Math.max(...suvs.map((c) => c.pricePerDay))}/day` : 'N/A'}\n\n🚗 **Sedans** (${sedans.length} available)\n   Great for city driving & comfort\n   Price range: ${sedans.length > 0 ? `${currency} ${Math.min(...sedans.map((c) => c.pricePerDay))} - ${currency} ${Math.max(...sedans.map((c) => c.pricePerDay))}/day` : 'N/A'}\n\n🚐 **Vans** (${vans.length} available)\n   Ideal for groups & road trips\n   Price range: ${vans.length > 0 ? `${currency} ${Math.min(...vans.map((c) => c.pricePerDay))} - ${currency} ${Math.max(...vans.map((c) => c.pricePerDay))}/day` : 'N/A'}`
    }

    // Available fuel types
    if (/fuel type|fuel option|what fuel|available fuel/i.test(lower)) {
      const fuels = getUniqueValues('fuel_type')
      return `⛽ Available fuel types:\n\n${fuels.map((f) => `• ${f} (${findCarsByFuel(f).length} cars)`).join('\n')}\n\nAsk me about any fuel type to see the cars!`
    }

    // Available locations
    if (/location|where|city|cities|available.*where|which.*location/i.test(lower)) {
      const locs = getUniqueValues('location')
      return `📍 We operate in these locations:\n\n${locs.map((l) => `• ${l} (${findCarsByLocation(l).length} cars)`).join('\n')}\n\nAsk about any city to see available cars there!`
    }

    // How to book
    if (/how.*book|booking.*process|rent.*car|how.*rent|how.*work/i.test(lower)) {
      return "📋 **How to Book a Car:**\n\n1️⃣ Browse cars on the Cars page or ask me for suggestions\n2️⃣ Click on a car to see details\n3️⃣ Select your pickup & return dates\n4️⃣ Click \"Book Now\" to confirm\n5️⃣ Track your bookings in \"My Bookings\"\n\nNo credit card needed to reserve! Want me to suggest a car?"
    }

    // Recommend / suggest
    if (/recommend|suggest|which.*should|help.*choose|best.*for|what.*good/i.test(lower)) {
      if (cars.length === 0) return "No cars are loaded yet. Please try again shortly!"
      const random = cars[Math.floor(Math.random() * cars.length)]
      return `🌟 I'd recommend:\n\n🚗 **${random.brand} ${random.model}** (${random.year})\n   ${random.category} • ${random.fuel_type} • ${random.seating_capacity} seats\n   📍 ${random.location} — ${currency} ${random.pricePerDay}/day\n\nTo narrow down, tell me:\n• What's your budget?\n• How many passengers?\n• Which city?\n• SUV, Sedan, or Van?`
    }

    // Total cars / inventory
    if (/how many|total.*car|inventory|stock/i.test(lower)) {
      return `📊 We currently have **${cars.length} cars** in our fleet!\n\n${getUniqueValues('category').map((c) => `• ${c}: ${findCarsByCategory(c).length} cars`).join('\n')}\n\nWant to browse a specific category?`
    }

    // Fallback - try fuzzy matching car model names
    const words = lower.split(/\s+/)
    for (const word of words) {
      if (word.length < 3) continue
      const modelMatch = cars.filter(
        (c) =>
          c.model?.toLowerCase().includes(word) ||
          c.brand?.toLowerCase().includes(word)
      )
      if (modelMatch.length > 0) {
        return `Found cars matching "${word}":\n\n${formatCarList(modelMatch)}`
      }
    }

    // Ultimate fallback
    return "I'm not sure I understood that. Here's what I can help with:\n\n• **Browse by type**: \"Show SUVs\", \"Sedans\", \"Vans\"\n• **Budget**: \"Cars under 200\"\n• **Location**: \"Cars in Colombo\"\n• **Features**: \"Automatic cars\", \"Diesel cars\"\n• **Seats**: \"Cars with 4 seats\"\n• **Recommendations**: \"Suggest a car\"\n• **Compare**: \"Compare categories\"\n• **How to book**: \"How do I rent a car?\""
  }

  // --- Send message handler ---

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = { role: 'user', text: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay for natural feel
    setTimeout(() => {
      const response = processMessage(userMsg.text)
      setMessages((prev) => [...prev, { role: 'bot', text: response }])
      setIsTyping(false)
    }, 600 + Math.random() * 800)
  }

  // Quick action buttons
  const quickActions = [
    { label: 'Show SUVs', msg: 'Show me SUVs' },
    { label: 'Budget Cars', msg: 'Show cheapest cars' },
    { label: 'Locations', msg: 'What locations are available?' },
    { label: 'How to Book', msg: 'How do I book a car?' },
  ]

  const handleQuickAction = (msg) => {
    setInput('')
    const userMsg = { role: 'user', text: msg }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)
    setTimeout(() => {
      const response = processMessage(msg)
      setMessages((prev) => [...prev, { role: 'bot', text: response }])
      setIsTyping(false)
    }, 600 + Math.random() * 600)
  }

  // Simple markdown-like rendering for bold text
  const renderText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={i} className="font-bold text-dark">
            {part.slice(2, -2)}
          </span>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
        bg-gradient-to-br from-primary to-purple-600 text-white
        flex items-center justify-center cursor-pointer
        shadow-xl shadow-primary/30 hover:shadow-primary/50
        hover:scale-105 active:scale-95 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="1" fill="currentColor" />
            <circle cx="12" cy="10" r="1" fill="currentColor" />
            <circle cx="15" cy="10" r="1" fill="currentColor" />
          </svg>
        )}
      </motion.button>

      {/* Unread indicator pulse */}
      {!isOpen && messages.length <= 1 && (
        <span className="fixed bottom-[72px] right-6 z-50 flex h-4 w-4 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
        </span>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-32px)]
            h-[540px] max-h-[calc(100vh-120px)]
            bg-white rounded-2xl shadow-2xl shadow-dark/15
            border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-dark via-[#1a1f4e] to-primary px-5 py-4
            flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
              flex items-center justify-center border border-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
                  <circle cx="12" cy="9" r="2.5" fill="white" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">CarRental AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-white/50 text-xs">Online • {cars.length} cars loaded</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed whitespace-pre-line
                    ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-primary to-purple-600 text-white rounded-2xl rounded-br-md shadow-md shadow-primary/15'
                        : 'bg-white text-gray-700 rounded-2xl rounded-bl-md shadow-sm border border-gray-100'
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto shrink-0 border-t border-gray-100 bg-white">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(action.msg)}
                    className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-full
                    bg-primary/5 text-primary border border-primary/10
                    hover:bg-primary/10 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="px-4 py-3 border-t border-gray-100 bg-white shrink-0 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about cars, budgets, locations..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5
                text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
                transition-all placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600
                text-white flex items-center justify-center cursor-pointer
                hover:shadow-lg hover:shadow-primary/30 active:scale-95 transition-all
                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none shrink-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
