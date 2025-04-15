# Integrantes
- Douglas dos Santos - uc23100992
- Felipe Alves Muniz - uc23101331
- Felipe Marinho - uc23101075
- Arthur Oliveira - uc23101199
- Enzo Freitas Lima - Uc23102171

# Introdução
Esse projeto foi criado com a intuição de crirar APIs com cruds de 3 entidades(estudante, cidade e uf)

# Criando o projeto
## 1. Instalando pacotes: 
- `npm install -g @nestjs/cli`
    - Esse comando instala a CLI do NestJS de forma global, tornando o comando `nest` disponível em qualquer pasta do seu sistema.
-`nest new .`
    - Criar o projeto dentro da pasta atual
-Escolha do gerenciador de pacotes
    - Nesse projeto foi utilizado o `npm`
-`npm i sqlite3 typeorm @nestjs/typeorm class-validator class-transformer`
    - instala pacotes necessários para a execução do projeto
    
## 2. Criando APIs com gerador de código:
- `nest g resource estudante`
    - Selecionar a opção Rest API
- `nest g resource cidade`
    - Selecionar a opção Rest API
- `nest g resource uf`
    - Selecionar a opção Rest API
## 3. Rodando o projeto
- `npm run start:dev` 

# Configurando o projeto
## Adotaremos a extensão REST Client do VS Code para consumirmos nossas APIs 
- A extensão REST Cliente é uma alternativa em
relação às ferramentas Insomnia (https://insomnia.rest/download) e Postman (https://www.postman.com/).
    - Com a extensão REST Cliente instalada, crie um arquivo com extensão .http para definição
    das rotas.
## Criando as resquisições da API

    ################################################
    ### UF
    
    ### UF - Criar
    POST http://localhost:3000/uf
    Content-Type: application/json
    
    {
      "sigla": "SP",
      "nome": "São Paulo"
    }
    
    ### UF - Listar todas
    GET http://localhost:3000/uf
    
    ### UF - Buscar por ID
    GET http://localhost:3000/uf/10
    
    ### UF - Atualizar
    PATCH http://localhost:3000/uf/11
    Content-Type: application/json
    
    {
      "nome": "São Paulo Atualizado"
    }
    
    ### UF - Deletar
    DELETE http://localhost:3000/uf/10
    
    
    ################################################
    ### CIDADE
    
    ### CIDADE - Criar
    POST http://localhost:3000/cidade
    Content-Type: application/json
    
    {
      "nome": "Campinas",
      "ufId": 11
    }
    
    ### CIDADE - Listar todas
    GET http://localhost:3000/cidade
    
    ### CIDADE - Buscar por ID
    GET http://localhost:3000/cidade/6
    
    ### CIDADE - Atualizar
    PATCH http://localhost:3000/cidade/6
    Content-Type: application/json
    
    {
      "nome": "Brasília Atualizada"
    }
    
    ### CIDADE - Deletar
    DELETE http://localhost:3000/cidade/6
    
    
    ################################################
    ### ESTUDANTE
    
    ### ESTUDANTE - Criar
    POST http://localhost:3000/estudante
    Content-Type: application/json
    
    {
      "nome": "Lucas",
      "matricula": "20252332",
      "email": "lucas@email.com",
      "dt_nascimento": "2003-05-20",
      "cidadeId": 6
    }
    
    ### ESTUDANTE - Listar todos
    GET http://localhost:3000/estudante
    
    ### ESTUDANTE - Buscar por ID
    GET http://localhost:3000/estudante/6
    
    ### ESTUDANTE - Atualizar
    PATCH http://localhost:3000/estudante/6
    Content-Type: application/json
    
    {
      "nome": "Lucas Atualizado"
    }
    
    ### ESTUDANTE - Deletar
    DELETE http://localhost:3000/estudante/6


## Criando a Validaçãdo dos dados
- exemplo:
    

        import { IsString, IsDateString, IsNumber } from "class-validator";

        export class CreateEstudanteDto {

            @IsString()
            nome: string;
    
            @IsString()
            email: string;
    
            @IsNumber()
             cidade_id: string;
    
            @IsDateString()
            dt_nascimento: string;
      
            @IsString()
            matricula: string;
        }

  
## TypeOrm e Sqlite
- No `app.module.ts` em imports adicionamos as configurações do typeorm e do banco de dados

        imports: [
            TypeOrmModule.forRoot({
                type: 'sqlite', <---Tipo de banco de dados que o typeorm vai trabalhar
                database: 'db.sqlite', <---Nome da database
                entities: [__dirname + '/**/*.entity{.ts,.js}'], <---Varre todos os arquivos .entity.ts ou .js 
                synchronize: true,
            }),
            EstudanteModule, CidadeModule, UfModule
        ],


- Nos módulos de `cidade`, `estudante` e `uf` adicionamos:

        imports:[TypeOrmModule.forFeature([Uf])]


## Criando as entidades
- uf:

        import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
        @Entity('uf')
        export class Uf {
        
          @PrimaryGeneratedColumn()
          id: number;
        
          @Column()
          nome: string;
        
          @Column()
          sigla: string;
        
        }


## Configurando os arquivos `.service.ts` das entidades(Injeção de dependência e Lógica na service)
- `Uf.service.ts`

        @Injectable()
        export class UfService {
          constructor(
            @InjectRepository(Uf)
            private readonly repository: Repository<Uf>
          ) {}
        
          create(dto: CreateUfDto) {
            const uf = this.repository.create(dto);
            return this.repository.save(uf);
          }
        
          findAll() {
            return this.repository.find();
          }
        
          findOne(id: number) {
            return this.repository.findOneBy({ id });
          }
        
          async update(id: number, dto: UpdateUfDto) {
            const uf = await this.repository.findOneBy({ id });
            if (!uf) return null;
            this.repository.merge(uf, dto);
            return this.repository.save(uf);
          }
        
          async remove(id: number) {
            const uf = await this.repository.findOneBy({ id });
            if (!uf) return null;
            return this.repository.remove(uf);
          }
        }


## Bônus
### Boas práticas
- `getById` -> Ao dar um get um em um objeto não encontrado aparecer erro 404 Not Founded
- `delete` -> Qunando um delete for dado ele não deve mostrar os dados do objeto e retornar 204 No Content
    - No arquivo controller

            import {
            Controller,
            Get,
            Post,
            Body,
            Patch,
            Param,
            Delete,
            } from '@nestjs/common';
            import { UfService } from './uf.service';
            import { CreateUfDto } from './dto/create-uf.dto';
            import { UpdateUfDto } from './dto/update-uf.dto';
            import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
            import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
        
            @Controller('uf')
            export class UfController {
            constructor(private readonly ufService: UfService) {}
        
            @Post()
            create(@Body() createUfDto: CreateUfDto) {
                return this.ufService.create(createUfDto);
            }
        
            @Get()
            findAll() {
                return this.ufService.findAll();
            }
        
            @Get(':id')
            async findOne(@Param('id') id: string) {
                const uf = await this.ufService.findOne(+id);
                if (!uf) throw new NotFoundException();
                return uf;
            }
        
            @Patch(':id')
            async update(@Param('id') id: string, @Body() updateUfDto: UpdateUfDto){
                const uf = await this.ufService.update(+id, updateUfDto);
                if (!uf) throw new NotFoundException();
                return uf;
            }
        
            @Delete(':id')
            @HttpCode(204)
            async remove(@Param('id') id: string) {
                const uf = await this.ufService.remove(+id);
                if (!uf) throw new NotFoundException();
            }
            }

 
