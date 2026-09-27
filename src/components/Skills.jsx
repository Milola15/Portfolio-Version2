import { motion } from 'framer-motion'
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact,
  FaJava, FaPhp, FaGitAlt, FaDocker,
  FaRobot
} from 'react-icons/fa'
import {
  SiLaravel, SiMysql, SiFirebase,
  SiTailwindcss, SiNextdotjs, SiC,
  SiPostman, SiAndroidstudio,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { BsStars } from 'react-icons/bs'

function Skills({ isLight }) {

  const categories = [
    {
      title: 'Front-end',
      skills: [
        { icon: <FaReact       className="text-[#61dafb]" />, name: 'React',      featured: true  },
        { icon: <SiNextdotjs   className={isLight ? 'text-[#1a0508]' : 'text-white'} />, name: 'Next.js', featured: true },
        { icon: <FaHtml5       className="text-[#e34f26]" />, name: 'HTML',       featured: false },
        { icon: <FaCss3Alt     className="text-[#264de4]" />, name: 'CSS',        featured: false },
        { icon: <FaJs          className="text-[#f7df1e]" />, name: 'JavaScript', featured: false },
        { icon: <SiTailwindcss className="text-[#38bdf8]" />, name: 'Tailwind',   featured: true  },
      ]
    },
    {
      title: 'Back-end',
      skills: [
        { icon: <SiLaravel  className="text-[#ff2d20]" />, name: 'Laravel',  featured: true  },
        { icon: <FaPhp      className="text-[#8892be]" />, name: 'PHP',      featured: false },
        { icon: <FaJava     className="text-[#f89820]" />, name: 'Java',     featured: false },
        { icon: <SiC        className="text-[#a8b9cc]" />, name: 'C',        featured: false },
        { icon: <SiMysql    className="text-[#4479a1]" />, name: 'MySQL',    featured: false },
        { icon: <SiFirebase className="text-[#ffca28]" />, name: 'Firebase', featured: true  },
      ]
    },
    {
      title: 'Outils',
      skills: [
        { icon: <FaGitAlt        className="text-[#f05032]" />, name: 'Git/GitHub',     featured: false },
        { icon: <VscVscode       className="text-[#007acc]" />, name: 'VS Code',        featured: false },
        { icon: <FaDocker        className="text-[#2496ed]" />, name: 'WampServer',     featured: false },
        { icon: <SiPostman       className="text-[#ff6c37]" />, name: 'Postman',        featured: false },
        { icon: <SiAndroidstudio className="text-[#3ddc84]" />, name: 'Android Studio', featured: false },
        { icon: <FaDocker        className="text-[#2496ed]" />, name: 'Docker',         featured: false },
      ]
    },
    {
      title: 'Outils IA',
      skills: [
        { icon: <FaRobot        className="text-[#c9a84c]" />, name: 'Claude', featured: false },
        { icon: <FaRobot        className="text-[#c9a84c]" />, name: 'Codex', featured: false },
        { icon: <BsStars        className="text-[#c9a84c]" />, name: 'Antigravity', featured: false },
        { icon: <BsStars        className="text-[#c9a84c]" />, name: 'Cursor', featured: false },
      ]
    },
  ]

  return (
    <section id="skills" className="px-6 py-14 max-w-5xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <span className={`text-xs uppercase tracking-[3px] font-bold whitespace-nowrap
          bg-clip-text text-transparent bg-gradient-to-r
          ${isLight
            ? 'from-[#c9a84c] to-[#8B2A3E]'
            : 'from-[#c9a84c] to-[#f5d98b]'
          }`}>
          Compétences
        </span>
        <div className={`flex-1 h-px bg-gradient-to-r
          ${isLight
            ? 'from-[#c9a84c]/50 to-transparent'
            : 'from-[#c9a84c]/40 to-transparent'
          }`}
        />
      </motion.div>

      <div className="flex flex-col gap-8">
        {categories.map((cat, catIndex) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
          >
            <p className={`text-xs font-bold uppercase tracking-[2px] mb-3
              ${isLight ? 'text-[#8a4050]' : 'text-white/40'}`}>
              — {cat.title}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {cat.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: catIndex * 0.1 + i * 0.06,
                    type: 'spring',
                    stiffness: 200
                  }}
                  whileHover={{ y: -4, scale: 1.05, transition: { duration: 0.2 } }}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl border
                    cursor-none transition-colors duration-300
                    ${skill.featured
                      ? isLight
                        ? 'bg-gradient-to-r from-[#c9a84c]/15 to-[#6B1A2A]/08 border-[#c9a84c]/45 shadow-sm'
                        : 'bg-[#c9a84c]/12 border-[#c9a84c]/40'
                      : isLight
                        ? 'bg-white border-[#6B1A2A]/20 shadow-sm'
                        : 'bg-white/06 border-white/12'
                    }
                  `}
                >
                  <span className="text-xl">{skill.icon}</span>
                  <span className={`text-sm font-semibold
                    ${skill.featured
                      ? isLight ? 'text-[#7a5010]' : 'text-[#f5d98b]'
                      : isLight ? 'text-[#1a0508]'  : 'text-white/85'
                    }`}>
                    {skill.name}
                  </span>
                  {skill.featured && (
                    <span className="text-[#c9a84c] text-xs">✦</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}

export default Skills