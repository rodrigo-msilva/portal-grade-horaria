import { useEffect, useState } from 'react';
import {
  Card,
  Select,
  Table,
  Typography,
  message
} from 'antd';

import AppLayout from '../components/AppLayout';
import { api } from '../services/api';

const { Title } = Typography;

export default function GradeHoraria() {
  const [cursoId, setCursoId] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [dias, setDias] = useState([]);

  useEffect(() => {
    api.get('/cursos').then(r => setCursos(r.data));
    api.get('/horarios').then(r => setHorarios(r.data));
    api.get('/dias-semana').then(r => setDias(r.data));
  }, []);

  useEffect(() => {
    if (cursoId) {
      api.get(`/cursos/${cursoId}/disciplinas`)
        .then(r => setDisciplinas(r.data));
    }
  }, [cursoId]);

  const columns = [
    {
      title: 'Horário',
      dataIndex: 'horario',
      fixed: 'left'
    },
    ...dias.map(d => ({
      title: d.descricao,
      render: (_, record) => (
        <Select
          style={{ width: '100%' }}
          allowClear
          placeholder="Selecionar"
          onChange={(disciplinaId) => {
            // aqui entra o POST/PUT da grade horária
            console.log({
              horario: record.horarioId,
              dia: d.id,
              disciplinaId
            });
          }}
        >
          {disciplinas.map(dis => (
            <Select.Option key={dis.id} value={dis.id}>
              {dis.nome}
            </Select.Option>
          ))}
        </Select>
      )
    }))
  ];

  const dataSource = horarios.map(h => ({
    key: h.id,
    horario: h.descricao,
    horarioId: h.id
  }));

  return (
    <AppLayout>
      <Title level={4}>Grade Horária</Title>

      <Card style={{ marginBottom: 16 }}>
        <Select
          placeholder="Selecione o curso"
          style={{ width: 300 }}
          onChange={setCursoId}
        >
          {cursos.map(c => (
            <Select.Option key={c.id} value={c.id}>
              {c.nome}
            </Select.Option>
          ))}
        </Select>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </AppLayout>
  );
}
