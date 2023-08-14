// 工具函数，修改时间格式
// utc修改为平常使用的
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default function formatUTC(
  utcString: string,
  format: string = 'YYYY/MM/DD HH:mm:ss'
) {
  // .utcOffset(8).这个是改变时区的。东巴区？偏移8个小时，加8小时
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}
