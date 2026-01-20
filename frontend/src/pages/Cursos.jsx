import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message
} from 'antd';

import {
  EditOutlined,
  DeleteOutlined,
  BookOutlined
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { api } from '../services/api';

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await api.get('/cursos');
      setCursos(res.data);
    } catch {
      message.error('Erro ao carregar cursos');
    }
  };

  const submit = async (values) => {
    try {
      if (editing) {
        await api.put(`/cursos/${editing.id}`, values);
        message.success('Curso atualizado');
      } else {
        await api.post('/cursos', values);
        message.success('Curso criado');
      }

      closeModal();
      load();
    } catch {
      message.error('Erro ao salvar curso');
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/cursos/${id}`);
      message.success('Curso removido');
      load();
    } catch {
      message.error('Erro ao excluir curso');
    }
  };

  const edit = (curso) => {
    setEditing(curso);
    form.setFieldsValue({ nome: curso.nome });
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
    form.resetFields();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <AppLayout>
      <Card
        title="Cursos"
        extra={
          <Button type="primary" onClick={() => setOpen(true)}>
            Novo Curso
          </Button>
        }
      >
        <Table
          rowKey="id"
          dataSource={cursos}
          columns={[
            {
              title: 'Nome',
              dataIndex: 'nome'
            },
            {
              title: 'Ações',
              align: 'center',
              width: 220,
              render: (_, r) => (
                <>
                  <Button
                    type="link"
                    icon={<BookOutlined />}
                    onClick={() =>
                      navigate(`/cursos/${r.id}/disciplinas`)
                    }
                  >
                    Disciplinas
                  </Button>

                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => edit(r)}
                  />

                  <Popconfirm
                    title="Tem certeza que deseja excluir este curso?"
                    onConfirm={() => remove(r.id)}
                  >
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined />}
                    />
                  </Popconfirm>
                </>
              )
            }
          ]}
        />
      </Card>

      <Modal
        title={editing ? 'Editar Curso' : 'Novo Curso'}
        open={open}
        onCancel={closeModal}
        onOk={() => form.submit()}
        okText="Salvar"
      >
        <Form layout="vertical" form={form} onFinish={submit}>
          <Form.Item
            name="nome"
            label="Nome do Curso"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </AppLayout>
  );
}
