import { useEffect, useState } from 'react';
import { Card, Transfer, Button, message, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

import AppLayout from '../components/AppLayout';
import { api } from '../services/api';

export default function CursoDisciplinas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [disciplinas, setDisciplinas] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);

  const load = async () => {
    try {
      setLoading(true);

      const [all, vinculadas] = await Promise.all([
        api.get('/disciplinas'),
        api.get(`/cursos/${id}/disciplinas`)
      ]);

      setDisciplinas(
        all.data.map(d => ({
          key: d.id.toString(),
          title: d.nome
        }))
      );

      setTargetKeys(
        vinculadas.data.map(d => d.id.toString())
      );
    } catch {
      message.error('Erro ao carregar disciplinas');
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    try {
      await api.post(`/cursos/${id}/disciplinas`, {
        disciplinas: targetKeys.map(Number)
      });

      message.success('Disciplinas associadas com sucesso');
      navigate('/cursos');
    } catch {
      message.error('Erro ao salvar associações');
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <AppLayout>
      <Card
        title="Gerenciar Disciplinas do Curso"
        extra={
          <Button type="primary" onClick={save}>
            Salvar
          </Button>
        }
      >
        {loading ? (
          <Spin />
        ) : (
          <Transfer
            dataSource={disciplinas}
            targetKeys={targetKeys}
            onChange={setTargetKeys}
            render={item => item.title}
            showSearch
            listStyle={{ width: 300, height: 420 }}
          />
        )}
      </Card>
    </AppLayout>
  );
}
