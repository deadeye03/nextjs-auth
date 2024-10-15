"use client"

import { motion, useAnimation } from "framer-motion"
import { useState, useEffect } from "react"
import { Cpu, Wifi, Zap, Server, Globe, Database } from "lucide-react"


const FloatingIcon = ({ icon:Icon, delay = 0 }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: { 
        duration: 5, 
        repeat: Infinity, 
        repeatType: "reverse",
        delay 
      }
    })
  }, [controls, delay])

  return (
    <motion.div
      animate={controls}
      className="absolute text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon size={24} />
    </motion.div>
  )
}

const CircuitLine = ({ delay = 0 }) => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 2, delay }}
    className="absolute h-px bg-gradient-to-r from-blue-500 to-purple-500"
    style={{
      width: `${30 + Math.random() * 40}%`,
      transform: `rotate(${Math.random() * 360}deg)`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
)

const DataCube = () => (
  <motion.div
    className="absolute w-20 h-20 perspective-1000"
    animate={{
      rotateX: 360,
      rotateY: 360,
      rotateZ: 360,
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <div className="w-full h-full relative transform-style-3d">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-full border-2 border-blue-400 bg-blue-500 bg-opacity-20"
          style={{
            transform: `rotateX(${i % 3 * 90}deg) rotateY(${Math.floor(i / 3) * 90}deg) translateZ(10px)`,
          }}
        />
      ))}
    </div>
  </motion.div>
)

const ParticleField= () => (
  useEffect(()=>{
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-blue-400 rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        transition={{
          duration: 10 + Math.random() * 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    ))}
  </div>
  },[])
)

export default function Intro() {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Particle field background */}
      <ParticleField />

      {/* Floating icons */}
      <FloatingIcon icon={Cpu} delay={0.5} />
      <FloatingIcon icon={Wifi} delay={1} />
      <FloatingIcon icon={Zap} delay={1.5} />
      <FloatingIcon icon={Server} delay={2} />
      <FloatingIcon icon={Globe} delay={2.5} />
      <FloatingIcon icon={Database} delay={3} />

      {/* Circuit lines */}
      {[...Array(15)].map((_, i) => (
        <CircuitLine key={i} delay={i * 0.2} />
      ))}

      {/* Welcome message */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showWelcome ? 1 : 0, y: showWelcome ? 0 : 50 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <h1 className="text-5xl font-bold text-white text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 2 }}
          >
            Welcome, Akash Agarwal Sir
          </motion.span>
          <br />
          <motion.span
            className="text-2xl font-normal text-blue-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 2 }}
          >
            to the future of technology
          </motion.span>
        </h1>
      </motion.div>

      {/* Pulsating circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32"
          style={{
            left: `${25 + i * 25}%`,
            top: `${25 + (i % 2) * 50}%`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
          }}
        >
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" />
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse opacity-40" />
        </motion.div>
      ))}

      {/* Data stream */}
      <div className="absolute right-10 top-0 bottom-0 w-px bg-blue-500 overflow-hidden">
        <motion.div
          className="h-full w-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
        />
      </div>

      {/* Rotating data cube */}
      <DataCube />

      {/* Futuristic frame */}
      <div className="absolute inset-4 border-2 border-blue-500 rounded-lg" />
      <motion.div
        className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-blue-500"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-blue-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 to-transparent pointer-events-none" />
    </div>
  )
}
