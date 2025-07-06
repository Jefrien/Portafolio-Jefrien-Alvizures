import clsx from "clsx"
import CountUp from "react-countup"

const stats = [
    {
        number: 8,
        title: "Years of experience"
    },
    {
        number: 10,
        title: "Projects completed"
    },
    {
        number: 4,
        title: "Technologies mastered"
    }    
]

export const Stats = () => {
  return (
    <section className='pt-4 pb-12 xl:pt-0 xl:pb-24'>
        <div className="container mx-auto px-4 xl:px-8">
            <div className='flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none'>
                {stats.map((stat, index) => {
                    return (
                        <div key={index}
                            className='flex-1 flex gap-4 items-center justify-center xl:justify-start'
                        >
                            <CountUp end={stat.number} duration={3} delay={0.5} className="text-4xl xl:text-6xl font-extrabold" />                            
                            <span className={clsx(
                                stat.title.length < 15 ? "max-w-[100px]" : "max-w-[150px]",
                                'leading-snug text-foreground/80'
                            )}>{stat.title}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
  )
}
