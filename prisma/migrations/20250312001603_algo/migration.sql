-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rua" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "enderecos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contatos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telefone" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "contatos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_usuarioId_key" ON "enderecos"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "contatos_telefone_key" ON "contatos"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "contatos_usuarioId_key" ON "contatos"("usuarioId");
