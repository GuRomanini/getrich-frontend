docker image prune
docker container prune
docker volume prune

cp ./infra/docker-compose.yaml docker-compose.yaml
docker-compose down -v

rm -f docker-compose.yaml
rm -f .docker-compose.yaml
rm -f .Dockerfile