import { HttpException, HttpStatus } from "@nestjs/common";

export class EntityNotFoundException extends HttpException {
    constructor(resource: string, entityName: string) {
        super(
        {
            statusCode: HttpStatus.NOT_FOUND,
            message: `${resource} with the ${entityName} provided was not found`,
            error: 'Not found'
        },
        HttpStatus.NOT_FOUND
    )};
}
