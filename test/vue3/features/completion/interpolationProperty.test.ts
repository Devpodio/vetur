import { CompletionItem, CompletionItemKind, MarkdownString } from 'vscode';
import { getDocUri } from '../../path';
import { testCompletion, testNoSuchCompletion } from '../../../completionHelper';
import { position } from '../../../util';

describe('Should autocomplete interpolation for <template> in property class component', () => {
  const parentTemplateDocUri = getDocUri('completion/interpolation/propertyDecorator/Parent.vue');

  describe('Should complete emits', () => {
    it(`completes child component's emits`, async () => {
      await testCompletion(parentTemplateDocUri, position(1, 25), [
        {
          label: '@foo',
          kind: CompletionItemKind.Function,
          documentation: new MarkdownString('My foo').appendCodeblock(
            `@Emit('foo')
foo() {}`,
            'js'
          )
        },
        {
          label: '@foo-bar',
          kind: CompletionItemKind.Function,
          documentation: new MarkdownString('My fooBar').appendCodeblock(
            `@Emit()
fooBar() {}`,
            'js'
          )
        }
      ]);
    });
  });
});
