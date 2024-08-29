import dayjs from "dayjs";

const mockData = {
	randomId: (length = 10) => {
		return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
		;
	},
	
	randomNum: (Min, Max) => {
		var Range = Max - Min;
		var Rand = Math.random();
		var num = Min + Math.round(Rand * Range); //四舍五入
		return num;
	},
	
	// 生成随机数据
	getData: () => {
		let datas = []
		for (let rowIndex = 0; rowIndex < 20; rowIndex++) {
			const rowId = mockData.randomId() + "" + rowIndex;
			const row = {
				id: rowId,
				name: rowIndex <= 8 ? '设备1-' + rowIndex : '设备2-' + rowIndex,
				typeName: rowIndex <= 8 ? '分类1' : '分类2',
				model: rowIndex,
				seat: mockData.randomNum(1, 5) + "楼",
				blockList: [],
				remark: ""
			}
			
			// let now = new Date("2024-08-29 00:00:00").getTime();
			let now = dayjs().startOf('day').valueOf();

			let types = [{
				status: 1,
				name: "转动测试"
			},
				{
					status: 1,
					name: "速度测试"
				},
				{
					status: 2,
					name: "停机"
				},
				{
					status: 3,
					name: "故障"
				},
			]
			
			const blockNum = mockData.randomNum(5, 10)
			for (let blockIndex = 0; blockIndex < blockNum; blockIndex++) {
				const randomDiff = mockData.randomNum(5, 30); //长度多少小时
				const startTime = now;
				const endTime = now + randomDiff * 3600000
				const type = types[mockData.randomNum(0, types.length - 1)]
				
				const block = {
					id: mockData.randomId() + "" + blockIndex,
					equipmentId: rowId,
					startTime: startTime,
					endTime: endTime,
					status: type.status,
					projectName: type.name + " - " + blockIndex,
					projectCode: mockData.randomId(),
					isValidate: "1"
				}
				
				now = endTime;
				//console.log(randomDiff, startTime, new Date(startTime), mockData.fomatter(new Date(startTime)));
				// console.log(JSON.stringify(block))
				
				row.blockList.push(block);
			}
			
			datas.push(row)
		}
		// console.log(datas)
		
		return datas;
	},
	
	fomatter: (date) => {
		if (!date) return ''
		let myDate = date
		try {
			if (date instanceof Date) {
				myDate = date
			} else {
				myDate = new Date(date)
			}
			const year = myDate.getFullYear()
			const month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
			const day = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
			const hours = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
			const minutes = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
			const seconds = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()
			return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
		} catch (e) {
			console.log('格式化错误', e)
		}
		return myDate
	},
}


export default mockData;
