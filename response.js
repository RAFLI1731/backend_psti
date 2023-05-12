const requestResponse = {
  success: {
    code: 200,
    status: true,
    message: "Success.",
  },
  suksesWithData: (data) => {
    return {
      code: 200,
      status: true,
      message: "Success.",
      data: data,
    };
  },
  suksesJoinData: (data, joinData) => {
    return {
      code: 200,
      status: true,
      message: "Success.",
      data: data,
      joinData: joinData,
    };
  },
  suksesWithLokasi: (data) => {
    return {
      code: 200,
      status: true,
      message: "Success.",
      data: data[0],
    };
  },
  suksesLogin: (data) => {
    return {
      code: 200,
      status: true,
      message: "Success.",
      data: data,
    };
  },
  incomplete_body: {
    code: 400,
    status: false,
    message: "Bad request. Please check your request data.",
  },
  unauthorized: {
    code: 401,
    status: false,
    message:
      "E-mail or password does not match, or you are not authorized to accessing this page.",
  },
  not_found: {
    code: 404,
    status: false,
    message: "Resource not found",
  },
  unprocessable_entity: {
    code: 422,
    status: false,
    message: "The request you sent is unable to process",
  },
  server_error: {
    code: 500,
    status: true,
    message: "Internal server error. Please contact the administrator.",
  },
};

module.exports = requestResponse;
