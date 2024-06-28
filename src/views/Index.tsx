import { useEffect, useState } from 'react';
import CreateFoodModal from '../components/modals/food/CreateFoodModal';
import Card from '../components/card/card';
import EditFoodModal from '../components/modals/food/EditFoodModal';
import { useTranslation } from 'react-i18next';
import { FoodInterface } from '../types/food-interface';
import { SFoodFindAll } from '../services/food-service';
import PerfectScrollbar from 'react-perfect-scrollbar'

const Index = () => {
    const [currentData, setCurrentData] = useState<FoodInterface[]>([]);
    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);
    const [idFood, setIdFood] = useState<number|null>(null);
    const [search, setSearch] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<any>(currentData);

    const { t, i18n } = useTranslation();
    const handleOpenCadastroModal = () => {
        setIsCadastroModalOpen(prev => !prev);
    };

    const handleOpenEditarModal = (id?: number) => {
        setIsEditarModalOpen(prev => !prev);
        if (id != null) {
            setIdFood(id);
        }
    };

    useEffect(() => {
        SFoodFindAll()
            .then(r => {
                if (r.data) {
                    setCurrentData(r.data);
                    setFilteredItems(r.data);
                }
            })
            .catch(r => console.log(r))
    }, []);

    useEffect(() => {
        if (currentData) {
            setFilteredItems(() => {
                return currentData.filter((item) => {
                    return item.title.toLowerCase().includes(search.toLowerCase()) || item.image.toLowerCase().includes(search.toLowerCase());
                });
            });
        }
    }, [search]);

    return (
        <div className="panel">
            <div className="space-y-5">
                <h1 className="text-3xl text-center p-5">Cardápio</h1>
                <hr/>
                <div className="flex w-full justify-between">
                    <form className="mx-auto w-full sm:w-1/2 mb-5">
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                placeholder={t('Search')}
                                className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type="button"
                                    className="btn btn-primary absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full w-9 h-9 p-0 flex items-center justify-center">
                            </button>
                        </div>
                    </form>

                    <button className="btn btn-primary" onClick={handleOpenCadastroModal}>{t('register')}</button>
                </div>
                <hr />
                <PerfectScrollbar className="grid grid-cols-4 gap-4 mt-5 max-h-[520px]">
                    {filteredItems?.map((item: any) => {
                        return (
                            <div key={item.id} className="overflow-hidden min-w-[200px]">
                                    <button
                                        className="flex justify-center mb-4 min-w-[150px] w-full"
                                        onClick={() => handleOpenEditarModal(item.id)}
                                    >
                                        <Card
                                            price={item.price}
                                            title={item.title}
                                            image={item.image}
                                        />
                                    </button>
                            </div>
                        );
                    })}
                </PerfectScrollbar>
                {
                    isCadastroModalOpen &&
                    <CreateFoodModal
                        showModal={isCadastroModalOpen}
                        closeModal={handleOpenCadastroModal}
                    />
                }
                {
                    isEditarModalOpen &&
                    <EditFoodModal
                        showModal={isEditarModalOpen}
                        closeModal={handleOpenEditarModal}
                        id={idFood ? idFood : 0}
                    />
                }
            </div>
        </div>
    );
};

export default Index;
