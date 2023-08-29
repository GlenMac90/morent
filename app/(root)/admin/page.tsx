'use client';

import { useReducer } from 'react';

import { seedCars } from '@/utils/seedCars';
import { seedCarReviews } from '@/utils/seedCarReviews';
import { deleteAllCars } from '@/lib/actions/car.actions';
import { Button } from '@/components/ui/button';
import { State, Action } from '@/lib/interfaces';

const initialState = {
  isConfirmingSeed: false,
  isConfirmingDelete: false,
  isConfirmingReviewsSeed: false,
};

const actionsConfig: {
  type: Action['type'];
  confirmText: string;
  actionText: string;
  cancelType: Action['type'];
  cancelText: string;
}[] = [
  {
    type: 'TOGGLE_SEED_CONFIRMATION',
    confirmText: 'Confirm Seed Cars',
    actionText: 'Seed Cars',
    cancelType: 'CANCEL_SEED_CONFIRMATION',
    cancelText: 'Cancel Seed Cars',
  },
  {
    type: 'TOGGLE_REVIEWS_SEED_CONFIRMATION',
    confirmText: 'Confirm Seed Reviews',
    actionText: 'Seed Reviews',
    cancelType: 'CANCEL_REVIEWS_SEED_CONFIRMATION',
    cancelText: 'Cancel Seed Reviews',
  },
  {
    type: 'TOGGLE_DELETE_CONFIRMATION',
    confirmText: 'Confirm Delete All Cars',
    actionText: 'Delete All Cars',
    cancelType: 'CANCEL_DELETE_CONFIRMATION',
    cancelText: 'Cancel Delete All Cars',
  },
];

const getIsConfirmingStateKey = (
  actionType: Action['type']
): keyof State | undefined => {
  switch (actionType) {
    case 'TOGGLE_SEED_CONFIRMATION':
      return 'isConfirmingSeed';
    case 'TOGGLE_REVIEWS_SEED_CONFIRMATION':
      return 'isConfirmingReviewsSeed';
    case 'TOGGLE_DELETE_CONFIRMATION':
      return 'isConfirmingDelete';
  }
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_SEED_CONFIRMATION': {
      return { ...state, isConfirmingSeed: !state.isConfirmingSeed };
    }
    case 'CANCEL_SEED_CONFIRMATION':
      return { ...state, isConfirmingSeed: false };
    case 'TOGGLE_REVIEWS_SEED_CONFIRMATION':
      return {
        ...state,
        isConfirmingReviewsSeed: !state.isConfirmingReviewsSeed,
      };
    case 'CANCEL_REVIEWS_SEED_CONFIRMATION':
      return { ...state, isConfirmingReviewsSeed: false };
    case 'TOGGLE_DELETE_CONFIRMATION':
      return { ...state, isConfirmingDelete: !state.isConfirmingDelete };
    case 'CANCEL_DELETE_CONFIRMATION':
      return { ...state, isConfirmingDelete: false };
    default:
      return state;
  }
};

const Page = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleActionClick = async (actionType: Action['type']) => {
    switch (actionType) {
      case 'TOGGLE_SEED_CONFIRMATION':
        if (state.isConfirmingSeed) {
          seedCars(10);
          dispatch({ type: 'CANCEL_SEED_CONFIRMATION' });
        } else {
          dispatch({ type: actionType });
        }
        break;
      case 'TOGGLE_REVIEWS_SEED_CONFIRMATION':
        if (state.isConfirmingReviewsSeed) {
          await seedCarReviews();
          dispatch({ type: 'CANCEL_REVIEWS_SEED_CONFIRMATION' });
        } else {
          dispatch({ type: actionType });
        }
        break;
      case 'TOGGLE_DELETE_CONFIRMATION':
        if (state.isConfirmingDelete) {
          try {
            await deleteAllCars();
            alert('All cars deleted successfully!');
            dispatch({ type: 'CANCEL_DELETE_CONFIRMATION' });
          } catch (error) {
            console.error(error);
            alert('Failed to delete all cars.');
          }
        } else {
          dispatch({ type: actionType });
        }
        break;
      default:
        dispatch({ type: actionType });
        break;
    }
  };

  return (
    <div className="flex h-[23rem] flex-col items-center justify-center bg-gray-300 py-[20rem]">
      <h1 className="mb-4 text-center text-2xl font-bold text-red-500 underline">
        Data Base Administration Page
      </h1>
      <p className="mb-6 text-[2rem] text-black">
        This page is for administration purposes only.
      </p>
      {actionsConfig.map((action, index) => {
        const key = getIsConfirmingStateKey(action.type);
        return (
          <div key={index} className="mb-4 flex space-x-12">
            <Button
              onClick={() => handleActionClick(action.type)}
              className={`bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
            >
              {key && state[key] ? action.confirmText : action.actionText}
            </Button>
            {key && state[key] && (
              <Button
                onClick={() => handleActionClick(action.cancelType)}
                className="bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
              >
                {action.cancelText}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Page;
