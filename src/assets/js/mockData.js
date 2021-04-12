const dirTree_Mock = {
    "msg": "Success!",
    "code": 200,
    "obj": [
        {
            "fileName": "03_绿牌",
            "filePath": "/root/PlateDetect/03_绿牌",
            "pid": "/root/PlateDetect",
            "id": "/root/PlateDetect/03_绿牌",
            "isDir": true
        },
        {
            "fileName": "04_多车牌",
            "filePath": "/root/PlateDetect/04_多车牌",
            "pid": "/root/PlateDetect",
            "id": "/root/PlateDetect/04_多车牌",
            "isDir": true
        },
        {
            "fileName": "99_其他",
            "filePath": "/root/PlateDetect/99_其他",
            "pid": "/root/PlateDetect",
            "id": "/root/PlateDetect/99_其他",
            "isDir": true
        },
        {
            "fileName": "temp",
            "filePath": "/root/PlateDetect/temp",
            "pid": "/root/PlateDetect",
            "id": "/root/PlateDetect/temp",
            "isDir": true
        },
        {
            "fileName": "02_黄牌",
            "filePath": "/root/PlateDetect/02_黄牌",
            "pid": "/root/PlateDetect",
            "id": "/root/PlateDetect/02_黄牌",
            "isDir": true
        },
        {
            "fileName": "train",
            "filePath": "/root/PlateDetect/train",
            "pid": "/root/PlateDetect",
            "id": "/root/PlateDetect/train",
            "isDir": true
        },
        {
            "fileName": "05_夜间",
            "filePath": "/root/PlateDetect/05_夜间",
            "pid": "/root/PlateDetect",
            "id": "/root/PlateDetect/05_夜间",
            "isDir": true
        },
        {
            "fileName": "01_蓝牌",
            "filePath": "/root/PlateDetect/01_蓝牌",
            "pid": "/root/PlateDetect",
            "id": "/root/PlateDetect/01_蓝牌",
            "isDir": true
        }
    ],
    "success": true
}


const fileTree_Mock = {
    "msg": "Success!",
    "code": 200,
    "obj": [
        {
            "fileName": "浙AF66316.jpg",
            "filePath": "/root/PlateDetect/03_绿牌/浙AF66316.jpg",
            "pid": "/root/PlateDetect/03_绿牌",
            "id": "/root/PlateDetect/03_绿牌/浙AF66316.jpg",
            "isDir": false
        },
        {
            "fileName": "粤BD123456.jpg",
            "filePath": "/root/PlateDetect/03_绿牌/粤BD123456.jpg",
            "pid": "/root/PlateDetect/03_绿牌",
            "id": "/root/PlateDetect/03_绿牌/粤BD123456.jpg",
            "isDir": false
        },
        {
            "fileName": "粤BD29099.jpg",
            "filePath": "/root/PlateDetect/03_绿牌/粤BD29099.jpg",
            "pid": "/root/PlateDetect/03_绿牌",
            "id": "/root/PlateDetect/03_绿牌/粤BD29099.jpg",
            "isDir": false
        }
    ],
    "success": true
}

const identificationData =  {
    "id": 2,
    "fileName": "2.jpg",
    "filePath": "/root/PlateDetect/01_蓝牌/2.jpg",
    "fileType": "jpg",
    "fileLength": 0,
    "plate": null,
    "plateColor": null,
    "lastRecoTime": "2020-08-15 22:48:48",
    "tempPath": "/root/PlateDetect/temp/1597502662335/",
    "recoPlate": null,
    "recoColor": null,
    "recoCorrect": 0,
    "debug": [
      
      {
        "id": null,
        "parentId": null,
        "fileName": "debug_char_auxRoi_6.jpg",
        "filePath": "/root/PlateDetect/temp/1597502662335/debug_char_auxRoi_6.jpg",
        "debugType": "debug_char_auxRoi",
        "fileLength": null,
        "lastRecoTime": null,
        "recoPlate": "",
        "plateColor": "",
        "sort": null
      },
      {
        "id": null,
        "parentId": null,
        "fileName": "result_0.png",
        "filePath": "/root/PlateDetect/temp/1597502662335/result_0.png",
        "debugType": "result",
        "fileLength": null,
        "lastRecoTime": null,
        "recoPlate": "豫Q88888",
        "plateColor": "蓝牌",
        "sort": null
      }
    ]
}


export {dirTree_Mock,fileTree_Mock,identificationData}