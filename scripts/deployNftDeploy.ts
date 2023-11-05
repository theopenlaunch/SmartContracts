import { toNano } from 'ton-core';
import { NftDeploy } from '../wrappers/NftDeploy';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const nftDeploy = provider.open(
        NftDeploy.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('NftDeploy')
        )
    );

    await nftDeploy.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(nftDeploy.address);

    console.log('ID', await nftDeploy.getID());
}
