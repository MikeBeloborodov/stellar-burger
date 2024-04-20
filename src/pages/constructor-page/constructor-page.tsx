import { useDispatch, useSelector } from 'react-redux';
import {
  fetchIngredients,
  selectLoading
} from '../../slices/stellarBurgerSlice';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { AppDispatch } from 'src/services/store';

export const ConstructorPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isIngredientsLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
