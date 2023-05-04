import { Button, Form, Select, TimePicker, DatePicker, Input } from "antd";
import type { DatePickerProps, TimePickerProps } from "antd";
import dayjs from "dayjs";

import './BookingForm.css';

interface IData {
  tower: string,
  floor: number,
  meetingRoom: number,
  date: DatePickerProps,
  time: TimePickerProps,
  comment: string
}

type IPreparedData = {
  date: string,
  time: string
} & Omit<IData, 'date' | 'time'>;

const BookingForm = () => {
  const submitHandler = (data: IData) => {
    const preparedData: IPreparedData = {
      ...data,
      date: dayjs(data.date).format('DD.MM.YYYY'),
      time: `${dayjs(data.time[0]).format('HH:mm:ss')} - ${dayjs(data.time[1]).format('HH:mm:ss')}`
    }

    console.log(JSON.stringify(preparedData))
  }

  return (
      <Form layout="vertical" onFinish={submitHandler} className="form">
        <Form.Item name="tower" label="Tower" rules={[{ required: true }]}>
          <Select
              placeholder="Select tower"
              allowClear
          >
            <Select.Option value="A">A</Select.Option>
            <Select.Option value="B">B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="floor" label="Floor" rules={[{ required: true }]}>
          <Select
              placeholder="Select floor"
              allowClear
          >
            {new Array(25).fill(0).map((_, idx) => (
                <Select.Option key={idx} value={idx + 3}>{idx + 3}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="meetingRoom" label="Meeting room" rules={[{ required: true }]}>
          <Select
              placeholder="Select meeting room"
              allowClear
          >
            {new Array(10).fill(0).map((_, idx) => (
                <Select.Option key={idx} value={idx + 1}>{idx + 1}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="date" label="Booking date and time" rules={[{ type: 'object' as const, required: true }]}>
          <DatePicker format='DD.MM.YYYY' />
        </Form.Item>
        <Form.Item name="time" rules={[{ required: true }]}>
          <TimePicker.RangePicker />
        </Form.Item>
        <Form.Item name="comment" label="Comment" rules={[{ required: true }]}>
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="form-button" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button className="form-button" htmlType="reset">
            Reset
          </Button>
        </Form.Item>
      </Form>
  )
}

export default BookingForm;
