import {useState} from "react";
import CreateFoodModal from "../components/modals/food/CreateFoodModal";
import Card from '../components/card/card';
import { HGetAllFood } from '../hooks/food-hock';
import EditFoodModal from '../components/modals/food/EditFoodModal';

const Index = () => {
    const {data} = HGetAllFood();
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);
    const [idFood, setIdFood] = useState(null)
    const handleOpenCadastroModal = () => {
        setIsCadastroModalOpen(prev => !prev);
    }

    const handleOpenEditarModal = (id?: number) => {
        setIsEditarModalOpen(prev => !prev);
        if (id) {
            setIdFood(id);
            return;
        }
    }

    return (
        <div className="panel">
            <div className="space-y-5">
                <h1 className="text-3xl text-center p-5">Cardápio</h1>
                <div className="grid">
                    <div className="flex space-x-5">
                        {data?.map(foodData =>
                            <button key={foodData.id} onClick={() => handleOpenEditarModal(foodData.id)}>
                                <Card
                                    price={foodData.price}
                                    title={foodData.title}
                                    image={foodData.image}
                                />
                            </button>
                        )}
                    </div>
                </div>
                {isCadastroModalOpen && <CreateFoodModal closeModal={handleOpenCadastroModal} />}
                {isEditarModalOpen && <EditFoodModal showModal={isEditarModalOpen} closeModal={handleOpenEditarModal} id={idFood} />}
            </div>

            <div className='flex w-full justify-end'>
                <button className="mt-5 btn btn-primary" onClick={handleOpenCadastroModal}>novo</button>
            </div>
        </div>
    );
};

export default Index;
