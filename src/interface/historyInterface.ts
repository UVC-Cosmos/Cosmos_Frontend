interface IStatistics {
  '1': number;
  '2': number;
  '3': number;
}

interface IDefect {
  machine1DefectRate: number;
  machine2DefectRate: number;
  totalDefectRate: number;
}

interface IDice {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
}

export interface IHistory {
  Statistics: IStatistics;
  Defect: IDefect;
  Dice: IDice;
}

// "Statistics": {
//         "1": 46,
//         "2": 39,
//         "3": 37,
//         "": 83
//     },
//     "Defect": {
//         "machine1DefectRate": 7,
//         "machine2DefectRate": 2,
//         "totalDefectRate": 9
//     },
//     "Dice": {
//         "0": null,
//         "1": 22,
//         "2": 10,
//         "3": 17,
//         "4": 9,
//         "5": 10,
//         "6": 4,
//         "7": null,
//         "9": null,
//         "undefined": null
//     }
