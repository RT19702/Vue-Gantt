<template>
	<div class="gant-container">
		<div class="gant-head">

		</div>
		<div class="gant-main">
			<div class="left">
				<div class="head">
					<!--    左边栏的列表头      -->
					<div class="head-box">
						<div class="gantt-row">
							<div class="gantt-block">类型</div>
							<div class="gantt-block text-line-1" style="width: 800px;">
								设备
							</div>
							<div class="gantt-block">机号</div>
							<div class="gantt-block">布局</div>
						</div>
					</div>
					<!--  左边栏的列表内容      -->
					<div class="left-box">
						<div class="gantt-row" v-for="(item, index) in gattData">
							<div class="gantt-block" :style="mergeCell('typeName', item.typeName, index)">{{ item.typeName }}</div>
							<div class="text-line-1 gantt-block" style="width:800px;">{{ item.name }}</div>
							<div class="gantt-block">{{ item.model }}</div>
							<div class="gantt-block">{{ item.seat }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="right">
				<!--  时间头      -->
				<div class="head">
					<div class="head-box">
						<div class="transition-transForm gantt-row">
							<div class="gantt-time-block" v-for="(item, index) in choiceTimeArr">
								<div class="top">
									{{ item }}
								</div>
								<div class="bottom">
									<!-- 24小时 -->
									<div class="day-item" v-for="index in 2" :key="index">
										<div class="text">{{ index === 2 ? '12-24' : '0-12' }}</div>
									</div>
								</div>
							</div>
						</div>
						<div style="width: 200px;height:60px;">备注</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import mockData from '@/mock/index.js'
import dayjs from 'dayjs'
import { ref,onMounted } from 'vue';
// Mock数据
const gattData = mockData.getData();
// 当前时间-第十天
const choiceTime = ref([dayjs().format('YYYY-MM-DD'), dayjs().add(10, 'day').format('YYYY-MM-DD')]);
const choiceTimeArr = ref([]);
// 初始化时间
const initTime = () => {
	const [startTime, endTime] = choiceTime.value.map(date => dayjs(date));
	const days = endTime.diff(startTime, 'day');
	choiceTimeArr.value = Array.from({ length: days + 1 }, (_, i) => startTime.add(i, 'day').format('YYYY-MM-DD'));
};
// 合并相同的单元格
const mergeCell = (key, value, index, center = true) => {
	const returnStyle = {};
	const nextRow = gattData[index + 1];
	const lastRow = gattData[index - 1];
	const isNotLastRow = index < gattData.length - 1;

	// 是否显示底部分割线
	if (isNotLastRow && nextRow?.typeName === value) {
		returnStyle.borderBottom = 'none';
	}

	// 计算行高
	let lastIndex = index;
	for (let rowIndex = index + 1; rowIndex < gattData.length; rowIndex++) {
		if (gattData[rowIndex][key] === value) {
			lastIndex = rowIndex;
		} else {
			// 如果不相等，就跳出循环 性能优化
			break;
		}
	}
	const rowSpan = lastIndex - index + 1;
	const rowHeight = 60 * rowSpan + 'px';

	returnStyle.height = rowHeight;
	if (center) {
		returnStyle.lineHeight = rowHeight;
	}

	// 是否需要显示文字,把文字颜色变成背景颜色
	if (index >= 1 && lastRow?.[key] === value) {
		returnStyle.color = '#ffffff';
	}

	return returnStyle;
}
onMounted(() => {
	initTime();
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>