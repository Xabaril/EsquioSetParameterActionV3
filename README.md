# Esquio (V3) Github Action set toggle parameter value for feature

With this Esquio Github action you can set a parameter value for a toggle in a feature in an Github Actions workflow.[Esquio](https://esquio.readthedocs.io/en/latest/).

Please read [Esquio readthedocs](https://esquio.readthedocs.io/en/latest/) first to fully understand Esquio Feature Toggle package configuration and possibilities.

## Parameters needed

- **esquio-url**: Url to the ESquio Api. i.e.: https://myesquioui.deployment.com
- **esquio-api-key**: API key to authenticate to esquio. Recommended to store as [Github secret](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables)
- **product-name**: Name of the product to which the feature belongs.
- **feature-name**: Name of the feature to chich the toggle belongs.
- **toggle-type**: Type of the toggle to set the parameter value.
- **parameter-name**: Name of the parameter inside the toggle.
- **value**: Value to set to the parameter.
- **deployment-name**: Name of the deplyment you want to set the value for (if you are using rings, otherwise leave empty)

## Example

```YAML
      - name: Esquio rollout
        uses: actions/esquio-rollout-v3
        id: esquio-rollout
        with:
          esquio-url: 'https://esquiodemoui.azurewebsites.net/'
          esquio-api-key: ${{ secrets.apikey }}
          product-name: 'Default'
          feature-name: 'MatchScore'
          toggle-type: 'Esquio.Toggles.GradualRolloutUserNameToggle,Esquio'
          parameter-name: 'Percentage'
          value: '56'
          deployment-name: 'Tests'
```
