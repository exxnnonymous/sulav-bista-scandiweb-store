import { gql} from '@apollo/client';


export const storeQuery = gql`
    query{
        categories{
            name
        }
    }
`