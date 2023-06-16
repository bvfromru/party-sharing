export const mockState = {
  people: [
    { id: 'dfkjf', name: 'Виталий' },
    { id: 'kjdkjsfd', name: 'Олег' },
    { id: 'ee45', name: 'Наташа' },
    { id: 'sdd43', name: 'Ирина' }
  ],
  purchases: [
    {
      id: 'ejrere',
      name: 'Хлеб',
      price: 154,
      buyerId: 'kjdkjsfd',
      consumers: {
        dfkjf: 1,
        kjdkjsfd: 1,
        ee45: 1,
        sdd43: 0
      }
    },
    {
      id: 'df5gdfg',
      name: 'Пиво',
      price: 458,
      buyerId: 'sdd43',
      consumers: {
        dfkjf: 0,
        kjdkjsfd: 1,
        ee45: 1,
        sdd43: 0
      }
    },
    {
      id: 'orpelf',
      name: 'Сок',
      price: 48,
      buyerId: 'ee45',
      consumers: {
        dfkjf: 1,
        kjdkjsfd: 1,
        ee45: 1,
        sdd43: 1
      }
    },
    {
      id: 'irerkm',
      name: 'Водка',
      price: 456,
      buyerId: 'dfkjf',
      consumers: {
        dfkjf: 0,
        kjdkjsfd: 1,
        ee45: 1,
        sdd43: 0
      }
    }
  ]
};
