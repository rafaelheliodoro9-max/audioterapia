'use client'

import { useState, useEffect } from 'react'
import { Brain, Headphones, Moon, Zap, Heart, Sparkles, ChevronRight, Menu, X, Play, CheckCircle, Star, Users, Shield, Volume2 } from 'lucide-react'

export default function AudioTherapyLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [purchaseCount, setPurchaseCount] = useState(12847)
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [recentActivities, setRecentActivities] = useState([
    { action: 'Maria Clara', detail: 'comprou o Pacote Completo', time: 'há 2 minutos' },
    { action: 'João Silva', detail: 'completou 30 dias de uso', time: 'há 5 minutos' },
    { action: 'Ana Costa', detail: 'avaliou com 5 estrelas', time: 'há 8 minutos' },
    { action: 'Pedro Santos', detail: 'indicou para 3 amigos', time: 'há 12 minutos' }
  ])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'how', 'benefits', 'tracks', 'testimonials', 'faq']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Simulate real purchase counter
  useEffect(() => {
    const interval = setInterval(() => {
      setPurchaseCount(prev => {
        const increment = Math.floor(Math.random() * 3) + 1
        return prev + increment
      })
    }, 8000 + Math.random() * 7000) // Random interval between 8-15 seconds

    return () => clearInterval(interval)
  }, [])

  // Update recent activities names every 5 seconds
  useEffect(() => {
    const firstNames = ['Maria', 'João', 'Ana', 'Pedro', 'Carlos', 'Lucas', 'Mariana', 'Gabriel', 'Isabela', 'Rafael', 'Camila', 'Daniel', 'Laura', 'Thiago', 'Juliana', 'Felipe', 'Bruna', 'Marcos', 'Patrícia', 'Ricardo']
    const lastNames = ['Silva', 'Santos', 'Costa', 'Oliveira', 'Pereira', 'Lima', 'Ferreira', 'Almeida', 'Ribeiro', 'Gomes', 'Martins', 'Rocha', 'Souza', 'Mendes', 'Barbosa', 'Castro', 'Azevedo', 'Vieira', 'Dias', 'Cruz']
    
    const interval = setInterval(() => {
      setRecentActivities(prev => prev.map(activity => ({
        ...activity,
        action: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
      })))
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail('')
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Neural Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("/neural-bg.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Brain className="w-8 h-8 text-cyan-500" />
                <div className="absolute inset-0 w-8 h-8 bg-cyan-500/20 blur-xl" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                Áudio Terapia
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Início' },
                { id: 'how', label: 'Como Funciona' },
                { id: 'benefits', label: 'Benefícios' },
                { id: 'tracks', label: 'Faixas' },
                { id: 'testimonials', label: 'Depoimentos' },
                { id: 'faq', label: 'FAQ' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-cyan-500 ${
                    activeSection === item.id ? 'text-cyan-500' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all hover:scale-105">
                Acessar Agora
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              {[
                { id: 'home', label: 'Início' },
                { id: 'how', label: 'Como Funciona' },
                { id: 'benefits', label: 'Benefícios' },
                { id: 'tracks', label: 'Faixas' },
                { id: 'testimonials', label: 'Depoimentos' },
                { id: 'faq', label: 'FAQ' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 px-4 text-sm font-medium text-gray-600 hover:text-cyan-500 hover:bg-gray-50"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 py-2">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full text-sm font-medium">
                  Acessar Agora
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8">
              {/* Social Proof */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 border-2 border-white" />
                  ))}
                </div>
                <span className="font-medium text-xs sm:text-sm">
                  +{purchaseCount.toLocaleString('pt-BR')} usuários ativos
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>

              {/* Headlines */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Transforme seu foco, ansiedade e produtividade com
                  <span className="block bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                    áudio terapia baseada em neurociência
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  Músicas binaurais produzidas profissionalmente para estudo, sono e controle emocional.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-medium hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base">
                  <span>Quero Meus Áudios Terapia</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
                {[
                  { icon: Brain, label: 'Foco Extremo' },
                  { icon: Moon, label: 'Sono Profundo' },
                  { icon: Heart, label: 'Reduz Ansiedade' },
                  { icon: Zap, label: 'Produtividade' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                    <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-500" />
                    <span className="truncate">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-full min-h-[300px]">
                <img
                  src="/hero-brain.png"
                  alt="Cérebro digital com conexões neurais"
                  className="absolute inset-0 w-full h-full object-contain scale-75 sm:scale-90 lg:scale-100"
                />
                
                {/* Sound Waves Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img
                    src="/sound-waves.png"
                    alt="Ondas sonoras"
                    className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 opacity-30 animate-pulse"
                  />
                </div>
                
                {/* Neural Connections - Simplified for mobile */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00ccff" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#9333ea" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  {/* Animated neural connections - fewer on mobile */}
                  {[...Array(8)].map((_, i) => (
                    <g key={i}>
                      <line
                        x1="200"
                        y1="200"
                        x2={200 + Math.cos((i * Math.PI) / 4) * 120}
                        y2={200 + Math.sin((i * Math.PI) / 4) * 120}
                        stroke="url(#neuralGradient)"
                        strokeWidth="1"
                        opacity="0.4"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                      <circle
                        cx={200 + Math.cos((i * Math.PI) / 4) * 120}
                        cy={200 + Math.sin((i * Math.PI) / 4) * 120}
                        r="2"
                        fill="#00ccff"
                        className="animate-ping"
                        style={{ animationDelay: `${i * 0.2}s`, animationDuration: '3s' }}
                      />
                    </g>
                  ))}
                </svg>

                {/* Floating Particles - fewer on mobile */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-500/30 rounded-full animate-ping"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${30 + (i % 2) * 30}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '4s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Logos */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center justify-items-center">
            {[
              { icon: Users, label: 'Estudantes' },
              { icon: Brain, label: 'Profissionais' },
              { icon: Sparkles, label: 'Criativos' },
              { icon: Heart, label: 'Terapeutas' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 text-gray-400 reveal-on-scroll" id={`social-${index}`}>
                <item.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-xs sm:text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Benefits Section */}
      <section id="benefits" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 reveal-on-scroll" id="benefits-header">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Criado para desbloquear o seu melhor estado mental
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Frequências sonoras desenvolvidas com base em pesquisas neurocientíficas para otimizar seu cérebro
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Zap,
                title: 'Foco Extremo',
                description: 'Aumente sua concentração e produtividade com frequências beta otimizadas',
                gradient: 'from-yellow-400 to-orange-500',
                stats: '+300% foco'
              },
              {
                icon: Heart,
                title: 'Redução de Ansiedade',
                description: 'Alivie o estresse e a tensão com ondas alfa calmantes',
                gradient: 'from-green-400 to-cyan-500',
                stats: '-70% ansiedade'
              },
              {
                icon: Moon,
                title: 'Sono Profundo',
                description: 'Melhore a qualidade do seu sono com frequências delta terapêuticas',
                gradient: 'from-blue-400 to-purple-500',
                stats: '+2h sono'
              },
              {
                icon: Brain,
                title: 'Produtividade Elevada',
                description: 'Otimize seu desempenho cognitivo para tarefas complexas',
                gradient: 'from-purple-400 to-pink-500',
                stats: '+150% prod.'
              },
              {
                icon: Sparkles,
                title: 'Relaxamento Guiado',
                description: 'Acesse estados de meditação profunda com facilidade',
                gradient: 'from-cyan-400 to-blue-500',
                stats: 'Zen total'
              },
              {
                icon: Volume2,
                title: 'Regulação Emocional',
                description: 'Equilibre suas emoções e melhore seu bem-estar geral',
                gradient: 'from-pink-400 to-red-500',
                stats: 'Equilíbrio'
              }
            ].map((benefit, index) => (
              <div key={index} className={`group relative p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:border-cyan-200 hover:shadow-xl transition-all duration-300 cursor-pointer reveal-on-scroll`} id={`benefit-${index}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 rounded-xl sm:rounded-2xl transition-opacity`} />
                
                {/* Stats Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${benefit.gradient} text-white`}>
                    {benefit.stats}
                  </span>
                </div>
                
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${benefit.gradient} p-2.5 sm:p-3 mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-cyan-600 transition-colors">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
                
                {/* Hover effect lines */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all">
                  <div className={`h-full bg-gradient-to-r ${benefit.gradient}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 reveal-on-scroll" id="how-header">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Neuroáudio em 3 passos
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Ciência e tecnologia trabalhando juntas para transformar sua mente
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: 1,
                title: 'Escolha a faixa ideal',
                description: 'Selecione o áudio perfeito para seu objetivo: foco, sono ou ansiedade',
                icon: Headphones
              },
              {
                step: 2,
                title: 'Seu cérebro sincroniza',
                description: 'As frequências binaurais alinham suas ondas cerebrais ao estado desejado',
                icon: Brain
              },
              {
                step: 3,
                title: 'Sinta resultados em minutos',
                description: 'Experimente melhoria imediata no seu estado mental e emocional',
                icon: Sparkles
              }
            ].map((step, index) => (
              <div key={index} className="relative text-center reveal-on-scroll" id={`how-step-${index}`}>
                <div className="relative inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6">
                  <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full opacity-20" />
                  <div className="relative w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                    {step.step}
                  </div>
                </div>
                <step.icon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-cyan-500" />
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                
                {/* Connection Lines - Hidden on mobile */}
                {index < 2 && (
                  <div className="hidden sm:block absolute top-6 sm:top-8 left-full w-full h-0.5 bg-gradient-to-r from-cyan-200 to-purple-200" style={{ width: '200%', left: '50%' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Plans */}
      <section id="tracks" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 reveal-on-scroll" id="tracks-header">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              O que você recebe
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Um pacote completo de áudios terapêuticos para todas as suas necessidades
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'Foco',
                icon: Zap,
                gradient: 'from-yellow-400 to-orange-500',
                features: [
                  '5 faixas binaurais para estudo profundo',
                  'Frequências alfa e beta',
                  'Ideal para provas, concursos e projetos'
                ],
                cta: 'Comprar Agora',
                count: '5 faixas',
                price: 'R$ 19,90'
              },
              {
                title: 'Sono',
                icon: Moon,
                gradient: 'from-blue-400 to-purple-500',
                features: [
                  '5 faixas para adormecer rápido',
                  'Frequências delta',
                  'Indução suave ao relaxamento'
                ],
                cta: 'Comprar Agora',
                count: '5 faixas',
                price: 'R$ 19,90'
              },
              {
                title: 'Anti-Ansiedade',
                icon: Heart,
                gradient: 'from-green-400 to-cyan-500',
                features: [
                  '5 faixas específicas para reduzir tensão',
                  'Sons ambientais terapêuticos',
                  'Alívio imediato do estresse'
                ],
                cta: 'Comprar Agora',
                count: '5 faixas',
                price: 'R$ 19,90'
              },
              {
                title: 'Pacote Completo',
                icon: Sparkles,
                gradient: 'from-purple-400 to-pink-500',
                features: [
                  'Todas as 15 faixas binaurais',
                  'Foco + Sono + Anti-Ansiedade',
                  'Economia de R$ 10,00',
                  'Acesso vitalício aos conteúdos',
                  'Mais 10 faixas de brinde',
                  'Total de 25 faixas exclusivas'
                ],
                cta: 'Comprar Pacote',
                duration: 'Completo',
                count: '25 faixas',
                price: 'R$ 49,90',
                popular: true
              }
            ].map((plan, index) => (
              <div key={index} className={`group relative bg-white rounded-xl sm:rounded-2xl border ${plan.popular ? 'border-purple-400 shadow-lg' : 'border-gray-100'} hover:border-cyan-200 hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1 reveal-on-scroll`} id={`plan-${index}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full whitespace-nowrap shadow-lg">
                      COMPLETO
                    </span>
                  </div>
                )}
                <div className={`h-0.5 sm:h-1 bg-gradient-to-r ${plan.gradient} group-hover:h-1 sm:group-hover:h-2 transition-all`} />
                
                {/* Plan Header */}
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${plan.gradient} p-2 sm:p-3 group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                      <plan.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-lg sm:text-xl font-bold text-gray-900">{plan.price}</div>
                      <div className="text-xs text-gray-500">{plan.count}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, ...plan.gradient.includes('yellow') ? { '--tw-gradient-from': '#facc15', '--tw-gradient-to': '#f97316' } : plan.gradient.includes('blue') ? { '--tw-gradient-from': '#60a5fa', '--tw-gradient-to': '#a855f7' } : plan.gradient.includes('green') ? { '--tw-gradient-from': '#4ade80', '--tw-gradient-to': '#06b6d4' } : { '--tw-gradient-from': '#c084fc', '--tw-gradient-to': '#f472b6' } }}>
                    {plan.title}
                  </h3>
                  
                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2 group/item">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-500 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                        <span className="text-xs sm:text-sm text-gray-600 group-hover/item:text-gray-800 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r ${plan.gradient} text-white rounded-full font-medium hover:shadow-lg transition-all hover:scale-105 group-hover:shadow-cyan-500/25 text-sm sm:text-base`}>
                    {plan.cta}
                  </button>
                </div>
                
                {/* Floating particles on hover - fewer on mobile */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping"
                      style={{
                        left: `${30 + i * 40}%`,
                        top: `${20 + i * 30}%`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 reveal-on-scroll" id="testimonials-header">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Depoimentos de quem transformou a mente
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Milhares de pessoas já estão colhendo os benefícios da terapia sonora
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: 'Ana Carolina Silva',
                role: 'Estudante de Medicina - USP',
                age: 23,
                city: 'São Paulo, SP',
                content: 'Antes eu não conseguia focar por mais de 30 minutos. Hoje estudo 4 horas seguidas sem distrações. Minhas notas melhoraram e a ansiedade antes das provas desapareceu. Uso as faixas de foco todos os dias!',
                rating: 5,
                avatar: 'AC',
                gradient: 'from-pink-400 to-purple-600',
                experience: '2 meses usando',
                results: ['+40% rendimento', '-80% ansiedade', '+3h foco diário']
              },
              {
                name: 'Roberto Mendes Jr.',
                role: 'Desenvolvedor Senior',
                age: 32,
                city: 'São José dos Campos, SP',
                content: 'Como programador, preciso de concentração extrema. As frequências beta me colocam em "flow state" rapidamente. Meu código melhorou, entrego projetos antes do prazo e ainda tenho mais tempo para a família.',
                rating: 5,
                avatar: 'RM',
                gradient: 'from-blue-400 to-cyan-600',
                experience: '4 meses usando',
                results: ['+60% produtividade', 'Entregas antecipadas', 'Mais qualidade de vida']
              },
              {
                name: 'Maria das Dores Santos',
                role: 'Terapeuta Ocupacional',
                age: 45,
                city: 'Rio de Janeiro, RJ',
                content: 'Uso com meus pacientes e os resultados são surpreendentes. Autistas, ansiosos, pessoas com insônia... todos beneficiados. É uma ferramenta terapêutica revolucionária que recomendo para todos os colegas.',
                rating: 5,
                avatar: 'MD',
                gradient: 'from-green-400 to-teal-600',
                experience: '6 meses usando',
                results: ['95% pacientes melhoram', 'Ferramenta profissional', 'Resultados rápidos']
              },
              {
                name: 'Pedro Henrique Costa',
                role: 'Empreendedor Digital',
                age: 28,
                city: 'Belo Horizonte, MG',
                content: 'Minha ansiedade estava me destruindo. Não dormia direito, estava sempre irritado. Hoje durmo 8 horas seguidas, acordo revigorado e lido com os desafios do negócio com muito mais calma e clareza.',
                rating: 5,
                avatar: 'PH',
                gradient: 'from-orange-400 to-red-600',
                experience: '3 meses usando',
                results: ['Sono restaurador', '-90% ansiedade', '+150% lucratividade']
              },
              {
                name: 'Fernanda Lima',
                role: 'Artista Plástica',
                age: 35,
                city: 'Curitiba, PR',
                content: 'Minha criatividade explodiu! As faixas de relaxamento profundo me colocam em estado meditativo perfeito para criar. Minhas obras estão mais vendidas e ganhei prêmios importantes.',
                rating: 5,
                avatar: 'FL',
                gradient: 'from-purple-400 to-pink-600',
                experience: '5 meses usando',
                results: ['Criatividade máxima', 'Prêmios conquistados', '+200% vendas']
              },
              {
                name: 'Carlos Alberto',
                role: 'Professor Universitário',
                age: 51,
                city: 'Porto Alegre, RS',
                content: 'Depois de 25 anos lecionando, estava esgotado. As terapias sonoras me deram nova energia. Consigo dar aulas com mais paixão, preparar aulas com mais clareza e ainda tenho tempo para pesquisa.',
                rating: 5,
                avatar: 'CA',
                gradient: 'from-indigo-400 to-blue-600',
                experience: '7 meses usando',
                results: ['Energia renovada', 'Aulas melhores', 'Publicações aprovadas']
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 hover:border-cyan-200 hover:shadow-xl transition-all reveal-on-scroll group" id={`testimonial-${index}`}>
                {/* Header with Avatar */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg group-hover:scale-110 transition-transform`}>
                      {testimonial.avatar}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500">{testimonial.age} anos • {testimonial.city}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex mb-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{testimonial.experience}</span>
                  </div>
                </div>

                {/* Testimonial Content */}
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 italic">
                  "{testimonial.content}"
                </p>

                {/* Results */}
                <div className="border-t pt-3">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Resultados:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {testimonial.results.map((result, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${testimonial.gradient} text-white`}>
                        {result}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="mt-3 flex items-center text-xs text-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Usuário verificado</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 reveal-on-scroll" id="faq-header">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Tire suas dúvidas sobre a terapia sonora
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                question: 'Como funcionam as frequências binaurais?',
                answer: 'Frequências binaurais funcionam enviando tons ligeiramente diferentes para cada ouvido. Seu cérebro cria uma terceira frequência que ajuda a sincronizar suas ondas cerebrais com o estado mental desejado.'
              },
              {
                question: 'Posso usar para estudar por longos períodos?',
                answer: 'Sim! As faixas de foco foram projetadas para uso prolongado. Recomendamos pausas a cada 90-120 minutos para máxima eficácia e descanso cerebral.'
              },
              {
                question: 'Ajuda realmente na ansiedade?',
                answer: 'Sim. Estudos científicos comprovam que frequências alfa e theta reduzem os níveis de cortisol e promovem relaxamento profundo. Nossos usuários relatam redução média de 70% na ansiedade.'
              },
              {
                question: 'É seguro usar para dormir?',
                answer: 'Completamente seguro. As frequências delta usadas nas faixas de sono são naturais e não viciantes. Elas apenas ajudam seu cérebro a entrar nos estágios de sono profundo mais rapidamente.'
              },
              {
                question: 'Como funciona o acesso?',
                answer: 'Ao adquirir a Áudio Terapia, você tem acesso imediato a todas as faixas. O acesso pode ser renovado anualmente para receber atualizações e novos conteúdos.'
              }
            ].map((faq, index) => (
              <details key={index} className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:border-cyan-200 transition-all reveal-on-scroll" id={`faq-${index}`}>
                <summary className="flex justify-between items-center p-4 sm:p-6 cursor-pointer font-medium text-sm sm:text-base">
                  {faq.question}
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-600 text-sm sm:text-base">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/neural-bg.png"
            alt="Conexões neurais"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center reveal-on-scroll" id="cta-content">
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
            </div>
            <Brain className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 mx-auto text-cyan-500" />
            
            {/* Orbiting particles - fewer on mobile */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full hidden sm:block"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(${40 + i * 5}px)`,
                  animation: `orbit ${4 + i * 0.5}s linear infinite`
                }}
              />
            ))}
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Pronto para transformar sua mente?
          </h2>
          <p className="text-base sm:text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
            Experimente a terapia sonora produzida por um especialista.
          </p>

          {/* Email Capture Form */}
          <div className="max-w-md mx-auto mb-6 sm:mb-8">
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor email..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-medium text-sm hover:shadow-xl transition-all hover:scale-105"
              >
                Quero começar
              </button>
            </form>
            {isSubscribed && (
              <div className="mt-3 text-green-600 text-sm font-medium">
                ✓ Email cadastrado com sucesso! Em breve enviaremos conteúdos exclusivos.
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Cadastre-se para receber dicas exclusivas e ofertas especiais. Não enviamos spam.
            </p>
          </div>
          
          <button className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-medium text-base sm:text-lg hover:shadow-xl transition-all hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">Quero Meus Áudios Terapia agora</span>
            <ChevronRight className="relative inline-block w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-500" />
              <span>Garantia de 30 dias</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-500" />
              <span>Acesso imediato</span>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-500" />
              <span>Áudios em alta qualidade</span>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes orbit {
            from {
              transform: translate(-50%, -50%) rotate(0deg) translateX(40px) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg) translateX(40px) rotate(-360deg);
            }
          }
          @media (min-width: 640px) {
            @keyframes orbit {
              from {
                transform: translate(-50%, -50%) rotate(0deg) translateX(60px) rotate(0deg);
              }
              to {
                transform: translate(-50%, -50%) rotate(360deg) translateX(60px) rotate(-360deg);
              }
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .reveal-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
          }
          
          .reveal-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
          }
          
          /* Hero animations on load */
          #nav-logo {
            animation: fadeInLeft 0.8s ease-out 0.2s both;
          }
          
          #nav-menu {
            animation: fadeInRight 0.8s ease-out 0.4s both;
          }
          
          #nav-mobile {
            animation: fadeInRight 0.8s ease-out 0.6s both;
          }
          
          #hero-social {
            animation: fadeInUp 0.8s ease-out 0.3s both;
          }
          
          #hero-headlines {
            animation: fadeInUp 0.8s ease-out 0.5s both;
          }
          
          #hero-ctas {
            animation: fadeInUp 0.8s ease-out 0.7s both;
          }
          
          #hero-features {
            animation: fadeInUp 0.8s ease-out 0.9s both;
          }
          
          #hero-image {
            animation: fadeInScale 1s ease-out 0.4s both;
          }
          
          /* Stagger animations for features */
          #hero-features > div:nth-child(1) { animation-delay: 0.9s; }
          #hero-features > div:nth-child(2) { animation-delay: 1.0s; }
          #hero-features > div:nth-child(3) { animation-delay: 1.1s; }
          #hero-features > div:nth-child(4) { animation-delay: 1.2s; }
          
          /* Scroll reveal animations */
          .reveal-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
          }
          
          /* Footer animations */
          #footer-logo.visible {
            animation: fadeInUp 0.8s ease-out 0.2s both;
          }
          
          #footer-product.visible {
            animation: fadeInUp 0.8s ease-out 0.4s both;
          }
          
          #footer-support.visible {
            animation: fadeInUp 0.8s ease-out 0.6s both;
          }
          
          #footer-legal.visible {
            animation: fadeInUp 0.8s ease-out 0.8s both;
          }
          
          #footer-copyright.visible {
            animation: fadeInUp 0.8s ease-out 1s both;
          }
          
          /* Sections animations */
          #social-0.visible { animation-delay: 0.1s; }
          #social-1.visible { animation-delay: 0.2s; }
          #social-2.visible { animation-delay: 0.3s; }
          #social-3.visible { animation-delay: 0.4s; }
          
          #benefits-header.visible { animation-delay: 0.2s; }
          #benefit-0.visible { animation-delay: 0.3s; }
          #benefit-1.visible { animation-delay: 0.4s; }
          #benefit-2.visible { animation-delay: 0.5s; }
          #benefit-3.visible { animation-delay: 0.6s; }
          #benefit-4.visible { animation-delay: 0.7s; }
          #benefit-5.visible { animation-delay: 0.8s; }
          
          #how-header.visible { animation-delay: 0.3s; }
          #how-step-0.visible { animation-delay: 0.4s; }
          #how-step-1.visible { animation-delay: 0.5s; }
          #how-step-2.visible { animation-delay: 0.6s; }
          
          #tracks-header.visible { animation-delay: 0.4s; }
          #plan-0.visible { animation-delay: 0.5s; }
          #plan-1.visible { animation-delay: 0.6s; }
          #plan-2.visible { animation-delay: 0.7s; }
          #plan-3.visible { animation-delay: 0.8s; }
          
          #testimonials-header.visible { animation-delay: 0.5s; }
          #testimonial-0.visible { animation-delay: 0.6s; }
          #testimonial-1.visible { animation-delay: 0.7s; }
          #testimonial-2.visible { animation-delay: 0.8s; }
          #testimonial-3.visible { animation-delay: 0.9s; }
          
          #faq-header.visible { animation-delay: 0.6s; }
          #faq-0.visible { animation-delay: 0.7s; }
          #faq-1.visible { animation-delay: 0.8s; }
          #faq-2.visible { animation-delay: 0.9s; }
          #faq-3.visible { animation-delay: 1.0s; }
          #faq-4.visible { animation-delay: 1.1s; }
          
          #cta-content.visible { animation-delay: 0.7s; }
        `}</style>
      </section>

      {/* Social Indicators */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 reveal-on-scroll" id="social-header">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Junte-se a milhares de brasileiros transformados
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Uma comunidade ativa que melhora sua mente todos os dias
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
            {[
              { 
                number: '15.2k', 
                label: 'Usuários Ativos',
                sublabel: 'Últimos 30 dias',
                icon: Users,
                trend: '+12%'
              },
              { 
                number: '4.9', 
                label: 'Avaliação',
                sublabel: 'Estrelas (2.3k avaliações)',
                icon: Star,
                trend: '+0.2'
              },
              { 
                number: '98%', 
                label: 'Satisfação',
                sublabel: 'Clientes felizes',
                icon: Heart,
                trend: '+3%'
              },
              { 
                number: '25', 
                label: 'Faixas',
                sublabel: 'Áudios exclusivos',
                icon: Volume2,
                trend: '+10'
              },
              { 
                number: '87%', 
                label: 'Retenção',
                sublabel: 'Continuam usando',
                icon: Shield,
                trend: '+5%'
              },
              { 
                number: '24/7', 
                label: 'Suporte',
                sublabel: 'Ajuda sempre disponível',
                icon: Sparkles,
                trend: '100%'
              }
            ].map((indicator, index) => (
              <div key={index} className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all reveal-on-scroll group" id={`social-${index}`}>
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 p-2.5 sm:p-3 group-hover:scale-110 transition-transform">
                    <indicator.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent mb-1">
                  {indicator.number}
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1">{indicator.label}</div>
                <div className="text-xs text-gray-500 mb-2">{indicator.sublabel}</div>
                <div className="text-xs font-semibold text-green-600">
                  {indicator.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Live Activity Feed */}
          <div className="mt-12 bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Atividade Recente</h3>
              <div className="flex items-center text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Ao vivo
              </div>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">{activity.action}</span>
                    <span className="text-gray-600">{activity.detail}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="col-span-2 md:col-span-1 reveal-on-scroll" id="footer-logo">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                <span className="font-bold text-lg sm:text-xl">Áudio Terapia</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">
                Tecnologia sonora aplicada à mente humana.
              </p>
            </div>
            
            <div className="reveal-on-scroll" id="footer-product">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Produto</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><button className="hover:text-cyan-400 transition-colors">Recursos</button></li>
                <li><button className="hover:text-cyan-400 transition-colors">Testemunhos</button></li>
              </ul>
            </div>
            
            <div className="reveal-on-scroll" id="footer-support">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Suporte</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><button className="hover:text-cyan-400 transition-colors">Contato</button></li>
                <li><button className="hover:text-cyan-400 transition-colors">FAQ</button></li>
              </ul>
            </div>
            
            <div className="reveal-on-scroll" id="footer-legal">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><button className="hover:text-cyan-400 transition-colors">Política de Privacidade</button></li>
                <li><button className="hover:text-cyan-400 transition-colors">Termos de Uso</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400 reveal-on-scroll" id="footer-copyright">
            <p>© 2024 Áudio Terapia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}