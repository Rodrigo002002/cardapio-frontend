import {useState} from "react";
import CreateFoodModal from "../components/modals/CreateFoodModal";
import Card from '../components/card/card';
import { HGetAllFood } from '../hooks/food-hock';

const Index = () => {
    const {data} = HGetAllFood();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev);
    }
    return (
        <div className="panel">
            <div className="space-y-5">
                <h1 className="text-3xl text-center p-5">Cardápio</h1>
                <div className="grid">
                    <div className="flex space-x-5">
                        {data?.map(foodData =>
                            <Card
                                price={foodData.price}
                                title={foodData.title}
                                image={foodData.image}
                            />
                        )}
                    </div>
                </div>
                {isModalOpen && <CreateFoodModal closeModal={handleOpenModal} />}
            </div>

            <div className='flex w-full justify-end'>
                <button className="mt-5 btn btn-primary" onClick={handleOpenModal}>novo</button>
            </div>
        </div>
    );
};

export default Index;
