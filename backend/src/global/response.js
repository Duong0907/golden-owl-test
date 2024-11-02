// Success
function CreatedResponse(message, data) {
    (this.message = message),
        (this.error = false),
        (this.statusCode = 201),
        (this.data = data);
}

function OKResponse(message, data) {
    (this.message = message),
        (this.error = false),
        (this.statusCode = 200),
        (this.data = data);
}

// Error
function BadRequestErrorResponse(message) {
    (this.message = message), (this.error = true), (this.statusCode = 400);
}

function NotFoundErrorResponse(message) {
    (this.message = message), (this.error = true), (this.statusCode = 400);
}

function InternalServerErrorResponse(message) {
    (this.message = message), (this.error = true), (this.statusCode = 500);
}

function UnauthorizedErrorResponse(message) {
    (this.message = message), (this.error = true), (this.statusCode = 401);
}

function ForbidenErrorResponse(message) {
    (this.message = message), (this.error = true), (this.statusCode = 403);
}

module.exports = {
    CreatedResponse,
    OKResponse,
    BadRequestErrorResponse,
    NotFoundErrorResponse,
    InternalServerErrorResponse,
    UnauthorizedErrorResponse,
    ForbidenErrorResponse,
};
