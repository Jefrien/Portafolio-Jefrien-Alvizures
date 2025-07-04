import { AnimatePresence, motion } from "motion/react"
import { useLocation } from "preact-iso";


const PageTransition = ({ children }) => {

    const { url } = useLocation();



    return (
        <AnimatePresence>
            <div key={url}>
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ 
                        opacity: 0,                        
                        transition: {                            
                            delay: 0.2,
                            duration: 0.4,
                            ease: 'easeInOut'
                        }
                     }}
                    className="h-screen w-screen fixed top-0 left-0 pointer-events-none z-50"

                />
                    {children}                
            </div>
        </AnimatePresence>
    )
}


export default PageTransition