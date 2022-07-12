import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import Axios from "axios";

export const handler = async (event: APIGatewayProxyEvent) => {

    const { queryStringParameters = {} } = event;
    const { currency } = queryStringParameters;

    if(!currency) {
        return formatJSONResponse({
            statusCode: 400,
            data: {
                message: "Missing currency query parameters",
            },
        });
    }

    const deals = await Axios.get('https://www.cheapshark.com/api/1.0/deals?upperPrice=15&pageSize=5');
    const dealsString = JSON.stringify(deals.data);

    return formatJSONResponse({
            data: {
                message: dealsString,
            }
        });
}