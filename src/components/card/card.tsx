interface CardProps {
    price: number,
    title: string,
    image: string
}

const Card = ({price, image, title}: CardProps) => {
    return (
        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
            <div className="py-7 px-6">
                <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[215px] overflow-hidden">
                    <img className="w-full h-full object-cover" src={image}/>
                </div>
                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">{title}</h5>
                <p className="text-white-dark">Valor: {price}</p>
                <button type="button" className="btn btn-primary mt-6">Explore More</button>
            </div>
        </div>
    )
};

export default Card
