eval "$(ssh-agent -s)"
ssh-add ~/.ssh/goguro8
ssh -T git@github.com
