const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = { id, title, createdAt, updatedAt, tags, body };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Catatan gagal ditambahkan",
    });
    response.code(500);
    return response;
  }
};

const getAllNoteHandler = (request, h) => {
  const response = h.response({
    status: "success",
    data: {
      notes,
    },
  });

  response.code(200);
  return response;
};

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    const response = h.response({
      status: "success",
      data: { note },
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Catatan tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      updatedAt,
      body,
    };

    const response = h.response({
      status: "success",
      message: "Catatan Berhasi Diperbaharui",
    });

    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbaharui catatan. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Catatan gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

module.exports = {
  addNoteHandler,
  getAllNoteHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
