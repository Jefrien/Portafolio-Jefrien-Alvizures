import { motion } from 'framer-motion'

export const Photo = () => {
  return (
    <div className="w-full h-full relative">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeIn" }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4, ease: "easeInOut" }}
                className="top-[4px] left-[4px] w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] dark:mix-blend-lighten rounded-full overflow-hidden absolute bg-[#1b1d22] dark:bg-transparent">
                <img
                    alt="Foto de Jefrien Alvizures"
                    className="w-full h-full object-contain"
                    src="/photo.avif" />
            </motion.div>

            <motion.svg 
            className="w-[300px] xl:w-[506px] h-[300px] xl:h-[506px]"
                fill="white"
                viewBox="0 0 506 506"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.circle 
                    cx="253"
                    cy="253"
                    r="255"                                        
                    strokeWidth="4"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeLinejoin="round"                    
                    initial={{ strokeDasharray: "24 10 0 0" }}
                    animate={{ 
                        strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                        rotate: [120, 360]
                     }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                    className="stroke-primary"
                />

            </motion.svg>

        </motion.div>
    </div>
  )
}
