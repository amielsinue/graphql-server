npx postgraphile \
    --connection postgres://postgres:postgres@localhost/mint_data \
    --jwt-token-identifier hidden.jwt_token \
    --jwt-secret apostoles \
    --jwt-verify-algorithms HS256 \
    -s hidden

#npx postgraphile \
#    --connection postgres://postgres:postgres@localhost/mint_data \
#    -s hiipydden