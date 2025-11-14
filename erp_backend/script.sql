CREATE TABLE IF NOT EXISTS usuarios (
    usuarioid BIGSERIAL CONSTRAINT pk_usuarios PRIMARY KEY,
    username VARCHAR(10) UNIQUE,
    password TEXT,
    is_tecnico BOOLEAN DEFAULT FALSE,
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE tecnicos (
    id_tecnico SERIAL PRIMARY KEY,
    usuarioid BIGINT UNIQUE NOT NULL,
    nome_completo VARCHAR(150) NOT NULL,
    email_contato VARCHAR(100) UNIQUE,
    especialidade VARCHAR(100),
    nivel VARCHAR(10) DEFAULT 'N1',
    ativo BOOLEAN DEFAULT TRUE,
    
    CONSTRAINT fk_tecnico_usuario FOREIGN KEY (usuarioid)
        REFERENCES usuarios (usuarioid)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE chamados (
    id_chamado SERIAL PRIMARY KEY,
    id_requisitante BIGINT NOT NULL,
    
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fechamento TIMESTAMP NULL,
    
    status VARCHAR(50) NOT NULL DEFAULT 'Aberto', 
    prioridade VARCHAR(50) DEFAULT 'Baixa',
    categoria VARCHAR(100),
    
    CONSTRAINT fk_chamado_requisitante FOREIGN KEY (id_requisitante)
        REFERENCES usuarios (usuarioid)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE chamado_tecnico (
    id_chamado INT NOT NULL,
    id_tecnico INT NOT NULL,
    data_atribuicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT pk_chamado_tecnico PRIMARY KEY (id_chamado, id_tecnico),
    
    CONSTRAINT fk_chamado_tecnico_chamado FOREIGN KEY (id_chamado)
        REFERENCES chamados (id_chamado)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    
    CONSTRAINT fk_chamado_tecnico_tecnico FOREIGN KEY (id_tecnico)
        REFERENCES tecnicos (id_tecnico)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO usuarios (username, password) VALUES
('admin', crypt('admin', gen_salt('bf'))),
('qwe', crypt('qwe', gen_salt('bf')))
ON CONFLICT (username) DO NOTHING;