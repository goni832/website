eval "$(ssh-agent -s)"
ssh-add ~/.ssh2/id_ed25519
ssh -T git@github.com
