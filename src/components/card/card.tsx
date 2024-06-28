import { useTranslation } from 'react-i18next';

interface CardProps {
    price: number,
    title: string,
    image: string
}

const Card = ({price, image, title}: CardProps) => {
    const { t, i18n } = useTranslation();

    return (
        <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
            <div className="py-7 px-6">
                <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[215px] overflow-hidden">
                    <img className="w-full h-full object-cover" src={image}/>
                </div>
                <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">{title}</h5>
                <p className="text-white-dark">{t('value')}: {price} R$</p>
            </div>
            <div className="w-full mb-4 text-center text-white-dark dark:bg-[#1b2e4b] !text-primary">
                <span>
                    {t('editClick')}
                </span>
            </div>
        </div>
    )
};

export default Card
