import React from 'react'
import ClassHeader from './ClassHeader'
import Container from '@/app/components/shared/Container/Container'
import { Col, Row } from 'antd'
import ClassNote from './ClassNote'
import Assignment from './Assignment'
import ClassResourse from './ClassResourse'
import UpcomingEvents from './UpcomingEvents'
import ClassTodo from './ClassTodo'
// import 'antd/dist/antd.css'; // Import Ant Design's CSS

const ClassManage = () => {
  return (
    <div>
        <Container>
        <ClassHeader />
        <Row>
            {/* --------- Main Content ----------- */}
            <Col span={15}>
            <div className="" style={{ padding: '10px'}}>
            <ClassNote />
            <Assignment />
            <ClassResourse />
            </div>
            </Col>

            {/* -------- Sidebar ---------------- */}
            <Col span={9}>
             <div style={{ paddingInline: '10px', paddingBlock: 15,  background: "#ddd", borderRadius: 10 }}>
            <UpcomingEvents />
            <ClassTodo />
            </div>
            </Col>
        </Row>
        </Container>
    </div>
  )
}

export default ClassManage