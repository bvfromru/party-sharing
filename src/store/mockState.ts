export const mockState = {
  people: [
    { id: 'vitaliyId', name: 'Виталий' },
    { id: 'olegId', name: 'Олег' },
    { id: 'natashaId', name: 'Наташа' },
    { id: 'irinaId', name: 'Ирина' }
  ],
  purchases: [
    {
      id: 'hlebId',
      name: 'Хлеб',
      price: 154,
      buyerId: 'olegId',
      consumers: {
        vitaliyId: 1,
        olegId: 1,
        natashaId: 1,
        irinaId: 0
      }
    },
    {
      id: 'pivoId',
      name: 'Пиво',
      price: 458,
      buyerId: 'irinaId',
      consumers: {
        vitaliyId: 0,
        olegId: 1,
        natashaId: 1,
        irinaId: 0
      }
    },
    {
      id: 'sokId',
      name: 'Сок',
      price: 48,
      buyerId: 'natashaId',
      consumers: {
        vitaliyId: 1,
        olegId: 1,
        natashaId: 1,
        irinaId: 1
      }
    },
    {
      id: 'vodkaId',
      name: 'Водка',
      price: 456,
      buyerId: 'vitaliyId',
      consumers: {
        vitaliyId: 0,
        olegId: 1,
        natashaId: 1,
        irinaId: 0
      }
    }
  ]
};
